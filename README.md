# React Course: Build a Drag and Drop Kanban Board

This project is a React application designed to create a drag-and-drop Kanban Board using **TypeScript**, **TailwindCSS**, and the **Dnd-Kit** library. It is structured to support multiple containers, allowing users to organize tasks efficiently across various columns.

[DEMO](https://kanban-psi-ten.vercel.app/)

## Features

- **Drag and Drop**: Seamlessly move items between columns or within the same column using the Dnd-Kit library.
- **TypeScript Integration**: Ensures robust type safety throughout the application.
- **TailwindCSS**: Utilizes TailwindCSS for a responsive and modern UI design.
- **Multiple Containers**: Supports managing tasks across multiple Kanban columns.
- **Customizable**: Easily extend or modify components to fit additional requirements.

## Prerequisites

Ensure you have the following installed on your development environment:

- **Node.js** (version 16 or later)
- **npm** or **yarn** (for package management)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/kanban-board.git
   ```

2. Navigate to the project directory:

   ```bash
   cd kanban-board
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Usage

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Production Build

To create a production-ready build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build` folder.

## File Structure

```plaintext
src/
├── components/        # Reusable UI components
├── containers/        # Columns for the Kanban board
├── hooks/             # Custom React hooks
├── styles/            # TailwindCSS configuration and global styles
├── utils/             # Utility functions
├── App.tsx            # Main application file
└── index.tsx          # Entry point of the application
```

## Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: Typed JavaScript for scalable and maintainable code
- **TailwindCSS**: Utility-first CSS framework for styling
- **Dnd-Kit**: Library for drag-and-drop interactions

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

Special thanks to the creators and maintainers of:

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Dnd-Kit](https://docs.dndkit.com/)
- [Kliton] (https://github.com/kliton)
