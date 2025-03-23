# MVPEvo - Next.js Boilerplate

Welcome to MVPEvo, a modern, feature-rich Next.js boilerplate designed to accelerate your web application development. MVPEvo comes with authentication, payment processing, internationalization, admin dashboard, and more out of the box.

## Features

- **Authentication**: Firebase + NextAuth integration
- **Payment Processing**: Stripe and LemonSqueezy integrations
- **Database**: PostgreSQL with Prisma ORM
- **UI**: TailwindCSS with shadcn/ui components
- **Internationalization**: Full i18n support with next-intl (English, French, Korean)
- **Admin Dashboard**: Complete admin interface for user management
- **Deployment**: Optimized for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18.x or later
- PostgreSQL database
- Firebase account (for authentication)
- Stripe or LemonSqueezy account (for payment processing)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mvp-evo.git
cd mvp-evo
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in the required environment variables (see detailed instructions in README.en.md)

4. Set up the database:

```bash
npx prisma migrate dev
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation

For detailed documentation, please refer to the language-specific README files:

- [English Documentation](./README.en.md)
- [French Documentation](./README.fr.md)
- [Korean Documentation](./README.kr.md)

## Customization

MVPEvo is designed to be easily customizable:

1. **Authentication**: Configure Firebase and NextAuth in `.env.local`
2. **Payment Processing**: Set up Stripe or LemonSqueezy in `.env.local`
3. **Database**: Modify the Prisma schema in `prisma/schema.prisma`
4. **UI**: Customize TailwindCSS in `tailwind.config.ts` and shadcn/ui in `components.json`
5. **Internationalization**: Add or modify translations in `messages/` directory
6. **Admin Dashboard**: Extend the admin dashboard in `src/app/[locale]/admin/`

## Support

If you have any questions or need support, please contact us at leanlabs.dev@gmail.com.

We're here to help you make the most of the MVPEvo boilerplate and build amazing web applications!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org)
- [Firebase](https://firebase.google.com)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [next-intl](https://next-intl-docs.vercel.app)
