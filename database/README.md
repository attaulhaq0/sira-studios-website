Database setup
==============

The schema contains website content seeds and empty submission/user tables. Review it before running against a new local database: initialization can replace tables. Do not run it against an existing client database. SQL is kept outside the website document root.

Set DB_HOST, DB_NAME, DB_USER and DB_PASS in the PHP server environment. Never put database credentials in frontend environment variables.
Set JWT_SECRET to a private random value of at least 32 characters before running the Sira API.
