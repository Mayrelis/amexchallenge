
# **AMEX Challenge Project**

[Git Repository](https://github.com/Mayrelis/amexchallenge)

## **Project Overview**

This project was developed to demonstrate my expertise as a Full-Stack Developer. It showcases my ability to work with modern technologies such as React, TypeScript, and server-side frameworks. The goal of this application is to provide a well-structured, scalable, and maintainable solution as part of a technical evaluation.

---

## **Installation**

To get started, ensure you have Node.js installed on your system. Then, install the required dependencies by running:

```bash
npm install
```
---

## **Running the Application**

You can run the application in different environments depending on your needs:

```bash
# Start the application in development mode
npm run start

# Run with live reload during development
npm run start:dev

# Start the application in production mode
npm run start:prod
```

> **Note:** Additional environment-specific configurations should be added for production readiness.

---

## **Testing**

The project uses **Jest** and **React Testing Library** for testing to ensure the application meets quality standards. All test files follow the naming conventions `*.test.tsx` or `*.spec.tsx` for clarity and organization.

### Running Tests

To execute all tests, use the following command:

```bash
npm run test
```

---

#### Commands:

- **Check for linting issues:**

    ```bash
    npm run lint
    ```

- **Fix linting issues automatically:**

    ```bash
    npm run lint:fix
    ```

---

## **Pre-Commit Validation**

The project uses **Husky** to enforce quality checks before any code is committed. This ensures only high-quality code reaches the repository.

### Features:

- Automatically runs `npm run lint` and `npm run test` before committing code.
- Prevents commits if any of the quality checks fail.

---

## **Continuous Integration**

This project includes a GitHub Actions workflow for automated quality validation. The CI pipeline ensures all changes meet project standards before being merged.

### Steps Included:

1. **Linting**: Verifies that the code adheres to coding standards.
2. **Testing**: Runs unit tests to validate functionality.
3. **Build Verification**: Confirms the application can be successfully built.


## **Caching Strategy**

The project uses a basic in-memory cache to optimize API calls and reduce redundant network requests. While effective for small-scale use, it can be enhanced with more robust options for production:

1. **LocalStorage**
2. **SessionStorage**
3. **IndexedDB**
4. **Service Workers**
5. **Redux Persist**

---

## **Environment Management**

To manage sensitive information like API keys and configuration settings securely, environment variables are used.

### Recommendations:

1. Use `.env` files for local development.
2. Manage production secrets using tools like GitHub Secrets or environment-specific CI/CD configurations.


## **Future Improvements**

1. Add end-to-end testing using **Cypress** or a similar tool.
2. Enhance Docker support for easier production deployment.
3. Implement a persistent caching solution for better scalability.

---

## **Author**

- **Name**: Mayrelis Morejon
- **GitHub Profile**: [Mayrelis on GitHub](https://github.com/Mayrelis)

---

## **License**