# Connecting to PostgreSQL Database in Docker from IntelliJ IDEA

This guide explains how to connect to and view the PostgreSQL database running in a Docker container from IntelliJ IDEA.

## Prerequisites

1. Make sure Docker and Docker Compose are installed on your system
2. Ensure the Docker containers are running using `docker-compose up`
3. IntelliJ IDEA with the Database Tools and SQL plugin installed

## Steps to Connect to the Database

### 1. Open Database Tool Window

1. In IntelliJ IDEA, click on the "Database" tab on the right side of the window
   - If you don't see the "Database" tab, go to View → Tool Windows → Database

### 2. Add a New Data Source

1. Click the "+" button in the Database tool window
2. Select "PostgreSQL" from the dropdown menu

### 3. Configure the Connection

Enter the following connection details:

- **Host**: localhost
- **Port**: 5432
- **Database**: studify
- **User**: postgres
- **Password**: postgres

These values match the configuration in your docker-compose.yml file.

### 4. Test the Connection

1. Click the "Test Connection" button to verify that IntelliJ IDEA can connect to the database
2. If the connection is successful, you'll see a "Successful" message
3. If the connection fails, ensure that:
   - The Docker containers are running
   - The port 5432 is correctly mapped in the docker-compose.yml file
   - No other service is using port 5432 on your machine

### 5. Apply and Save the Connection

1. Click "Apply" and then "OK" to save the connection

## Viewing Database Tables

Once connected, you can view and interact with the database tables:

1. Expand the database connection in the Database tool window
2. Navigate to "studify" → "schemas" → "public" → "tables"
3. You should see the tables created by the application:
   - `users` - Contains user information
   - `tokens` - Contains authentication tokens

## Running SQL Queries

You can execute SQL queries against the database:

1. Right-click on the database connection and select "New" → "Query Console"
2. Write your SQL query in the editor that opens
3. Click the green "Run" button to execute the query

Example queries:

```sql
-- View all users
SELECT * FROM users;

-- View all tokens
SELECT * FROM tokens;

-- View tokens for a specific user
SELECT t.* FROM tokens t JOIN users u ON t.user_id = u.id WHERE u.username = 'admin';
```

### Using the Database Console

IntelliJ IDEA provides a powerful Database Console for interacting with your database:

1. After creating a database connection, double-click on the connection or right-click and select "Open Console"
2. The console provides:
   - Code completion for SQL keywords and table/column names
   - Parameter hints
   - Error highlighting
   - Result visualization options (table view, text view, etc.)
   - Export functionality for query results

### Exploring Table Structure

To view the structure of a table:

1. Expand the database connection → schemas → public → tables
2. Right-click on a table (e.g., "users") and select "Table Editor"
3. This opens a visual interface where you can:
   - View all records in the table
   - Add, edit, or delete records
   - Sort and filter data
   - Export data to various formats

4. Alternatively, right-click on a table and select "DDL" to see the SQL that created the table

## Database Diagrams

IntelliJ IDEA allows you to create visual diagrams of your database structure:

1. Right-click on the database connection or a specific schema
2. Select "Diagrams" → "Show Visualization"
3. This opens a diagram showing tables and their relationships
4. You can:
   - Rearrange tables by dragging them
   - Show or hide columns
   - Highlight relationships between tables
   - Export the diagram as an image

## Refreshing the Database View

If you make changes to the database schema through the application:

1. Right-click on the database connection
2. Select "Refresh" to update the view with the latest schema changes

## Troubleshooting

If you encounter issues connecting to the database:

1. Ensure the Docker containers are running with `docker-compose ps`
2. Check the logs for the PostgreSQL container with `docker-compose logs postgres`
3. Verify that the port mapping is correct in docker-compose.yml
4. Make sure no other service is using port 5432 on your machine

## Conclusion

IntelliJ IDEA provides powerful tools for working with databases, making it easy to view, query, and manage your PostgreSQL database running in Docker. By following this guide, you should be able to:

1. Connect to your PostgreSQL database from IntelliJ IDEA
2. View and explore the database tables and their structure
3. Run SQL queries and view the results
4. Create visual diagrams of your database structure

These capabilities make development and debugging much easier by providing direct access to your application's data without leaving the IDE.

## Additional Resources

- [IntelliJ IDEA Database Tools Documentation](https://www.jetbrains.com/help/idea/database-tool-window.html)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
