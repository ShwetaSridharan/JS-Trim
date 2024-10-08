# JSTrim: JavaScript Dependency Analyzer


![Snip20241007_2](https://github.com/user-attachments/assets/13d89fba-967c-46d8-8dbe-670d2b7435b3)


JSTrim is a comprehensive JavaScript dependency optimization tool built with Node.js, Express, and PostgreSQL. It analyzes JavaScript code to identify dependencies and provides actionable optimization suggestions.

## Features

- Analyze JavaScript code snippets for dependencies
- Identify both ES6 imports and CommonJS require statements
- Store analysis results in a PostgreSQL database
- Simple web interface for easy code submission and analysis
- RESTful API for integration with other tools

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- PostgreSQL (v12.0 or later)

## Installation

1. Clone the repository: git clone https://github.com/yourusername/jstrim.git
cd jstrim
2. Install the dependencies: npm install
3. Set up the database:
- Create a new PostgreSQL database named `jstrim`
- Update the `db.config.js` file with your database credentials.
4. Run the database schema: psql -d jstrim -f schema.sql

## Configuration

1. Update `db.config.js` with your PostgreSQL connection details:
  ```javascript
  module.exports = {
  user: 'your_username',
  host: 'localhost',
  database: 'jstrim',
  password: 'your_password',
  port: 5432,
  };
  ```
2. (Optional) Modify config/webpack.config.js and config/babel.config.js if you need to customize the build process.

## Usage
1. Start the development server- npm run dev.
2. Open your web browser and navigate to http://localhost:3000
3. Paste your JavaScript code into the text area and click "Analyze Dependencies".
4. View the analysis results displayed on the page (Check screenshot above).

## API Endpoints
1. POST /api/analyze: Analyze a JavaScript code snippet
   --> Body:
   ``` { "code": "your JavaScript code here" } ```
   --> Returns:
   ``` { "id": "analysis_id", "dependencies": ["dep1", "dep2", ...] } ```
3. GET /api/analysis/:id: Retrieve a previous analysis result
   --> Returns:
   ``` { "id": "analysis_id", "code_snippet": "...", "results": {...}, "created_at": "..." } ```

## Roadmap

Future development of JSTrim will focus on enhancing its capabilities and user experience. Here's what I will be planning:

### Short-term Goals (Next 3 months)
- Implement full project analysis (directory traversal)
- Add support for React and Vue.js specific dependency detection
- Create a visual dependency graph for analyzed projects
- Implement unused dependency detection

### Mid-term Goals (3-6 months)
- Develop a plugin system for extending analysis capabilities
- Add integration with popular package managers (npm, yarn)
- Implement automatic suggestion of alternative packages
- Create a command-line interface (CLI) for JSTrim

### Long-term Goals (6+ months)
- Develop a VS Code extension for real-time dependency analysis
- Implement machine learning for smarter dependency optimization suggestions
- Add support for TypeScript projects
- Create a cloud-based version of JSTrim for analyzing large-scale projects

I am always open to suggestions! If you have ideas for new features, please open an issue to discuss them.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgements
Express.js
PostgreSQL
Babel
Webpack
