# 🦜 BUDGY

![Version](https://img.shields.io/badge/version-0.1.6-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Last Commit](https://img.shields.io/github/last-commit/s0vit/shoplist-fe)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![PNPM](https://img.shields.io/badge/pnpm-%3E%3D9.0.0-orange)

BUDGY is a comprehensive expense tracking application that allows users to manage their expenses efficiently. Users can create, read, update, and delete expenses, as well as categorize them for better organization.

## Features

- **User Authentication**: Secure login, registration, and password recovery
- **Expense Management**: Create, view, edit, and delete expenses
- **Categorization**: Organize expenses by custom categories
- **Payment Methods**: Track different payment sources
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Internationalization**: Support for multiple languages
- **User Profiles**: Manage user information and preferences

Each expense includes:
- Amount
- Description
- Category
- Payment method
- Date

## Installation

### Prerequisites

- Node.js >= 20
- PNPM >= 9.0.0

We are using pnpm as a package manager. To install it, run the following command:

```bash
npm install -g pnpm
```

To install the dependencies, run the following command:

```bash
pnpm install
```

## Usage

After installation, you can:

1. **Login or Register**: Create an account or log in to an existing one
2. **Add Expenses**: Track your spending by adding new expenses
3. **Categorize**: Organize expenses by categories
4. **Filter and Sort**: Find specific expenses using filters
5. **Manage Profile**: Update your user information and preferences
6. **View Reports**: Analyze your spending patterns (coming soon)

## Development

To start the development server, run the following command:

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173` by default.

### Build

To build the application for production, run:

```bash
pnpm run build
```

### Testing

The project includes both end-to-end and unit tests:

```bash
# Run end-to-end tests
pnpm run test:e2e

# Run end-to-end tests with UI
pnpm run test:e2e:debug

# Run unit tests
pnpm run test:unit
```

### Linting and Formatting

```bash
# Run linter
pnpm run lint

# Fix linting issues
pnpm run lint:fix

# Check formatting
pnpm run format

# Fix formatting issues
pnpm run format:fix
```

## Technologies

### Core
- **[React](https://reactjs.org/)**: UI library
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript
- **[React Router](https://reactrouter.com/)**: Navigation and routing
- **[Zustand](https://zustand.surge.sh/)**: State management
- **[React Query](https://tanstack.com/query/latest)**: Data fetching and caching

### UI
- **[Material-UI](https://material-ui.com/)**: Component library
- **[React Icons](https://react-icons.github.io/react-icons/)**: Icon library
- **[React Toastify](https://fkhadra.github.io/react-toastify/introduction)**: Toast notifications

### Internationalization
- **[i18next](https://www.i18next.com/)**: Localization framework

### API
- **[Axios](https://axios-http.com/)**: HTTP client

### Build Tools
- **[Vite](https://vitejs.dev/)**: Build tool and dev server
- **[ESLint](https://eslint.org/)**: Code linting
- **[Prettier](https://prettier.io/)**: Code formatting

### Testing
- **[Playwright](https://playwright.dev/)**: End-to-end testing
- **[Vitest](https://vitest.dev/)**: Unit testing
- **[Storybook](https://storybook.js.org/)**: Component development and testing
- **[Loki](https://loki.js.org/)**: Screenshot testing

## Contributing

We welcome contributions to BUDGY! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Guidelines

- **Each PR should be reviewed by at least one other person before being merged**
- **Each PR should have a link to the issue that it solves**
- Make sure to update tests as appropriate
- Follow the existing code style and formatting guidelines
- Write meaningful commit messages
- Update documentation as needed

## Project Status

![Status](https://img.shields.io/badge/status-active%20development-brightgreen)

This project is currently in active development. New features are being added regularly, and the codebase is evolving.

### Ongoings

- Share expanses with multiple users
- Single expense view
- Add the ability to display expenses separately in different currencies
- Add the ability to create recurring payments
- Deferred/upcoming payments
- Add a text prompt for comments
- Display amount spent this month in the expense list
- AI-powered expense analyzer


### Small fixes to do

- Add confirm email button into alert
- Custom eslint rule for zustand stores (to contain autogenerated selector)
- Remove single expense from shared expenses
- Own UI-kit for the project
- Add infinite scrolling to the expense list
- Edit and "share" accounts and categories from the calculator
- Send user language information to the backend upon registration
- Make categories and accounts draggable
- Move filters to the side when opening the desktop version
- Add a skeleton for requests
- Don't reset filters when entering expenses
- Add Storybook deployment



### Deployment

Current production version: [BUDGY](https://shoplist-fe.vercel.app/)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License

## Acknowledgements

- All the contributors who have helped shape this project
- The open-source community for providing the tools and libraries used in this project
