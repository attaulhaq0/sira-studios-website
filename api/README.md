# PHP backend configuration

Set backend values in the PHP process environment or your hosting control panel. Keep credentials out of committed source and out of variables prefixed `VITE_`, which are public frontend build values.

| Variable | Purpose |
| --- | --- |
| `DB_HOST` | MySQL hostname; defaults to `localhost`. |
| `DB_NAME`, `DB_USER`, `DB_PASS` | Database name, account and password. |
| `JWT_SECRET` | A securely generated signing secret of at least 32 characters. |
| `SIRA_RATE_LIMIT_DIR` | Required absolute path to an existing private counter directory outside the web document root. |

For a Linux host, provision a directory such as `/home/site-private/sira-rate-limits`, owned by the PHP service user with mode `0700`, and set `SIRA_RATE_LIMIT_DIR` to that path. On Windows, restrict the directory ACL to the PHP service account and administrators. The web server must supply its actual `DOCUMENT_ROOT`. Missing, public, unreadable, unwritable or malformed storage fails closed with the existing JSON error shape and HTTP 503.

The backend retains its 60-second window: contact/careers have 10 requests per action/IP; registration and login have 5 requests per action/IP. Login additionally allows 5 attempts per normalized email account across all IPs. Attempts count before credential verification, including successful attempts; a full bucket responds with the existing HTTP 429 error. IPs come from `REMOTE_ADDR`; configure a trusted proxy at the server if necessary rather than trusting arbitrary forwarding headers.

Counters are shared across PHP workers and fresh session cookies. A stable per-key lock serializes each read/update. Filenames are HMACs using a domain-separated `JWT_SECRET`; counter contents hold only a start timestamp and count. Keep the signing secret stable across workers; changing it starts a new key namespace. The file implementation requires one host, or a shared filesystem with reliable cross-worker `flock` semantics. For independent hosts, use a shared atomic rate-limit service instead of separate local directories.

Do not place the counter directory in the deployment archive or public GitHub repository. Existing counters reset in place when their window expires. Monitor private storage capacity; remove obsolete counter and lock files only while the PHP backend is stopped, because deleting live lock files can split a lock across two inodes. Storage corruption requires operator repair and never silently resets a quota.

Run the offline regression suite with PHP 8.1 or later:

```sh
php tests/test_rate_limit.php
```

Tests use real PHP subprocesses, file locks and generated temporary fixtures. They use no database, live client API or outgoing mail. `SIRA_TEST_TEMP_DIR` optionally selects the temporary root.
