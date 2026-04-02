# Nestoria

Nestoria is a luxury cabin reservation website built with Next.js 14, React 18, Tailwind CSS, Supabase, and NextAuth.

The app lets guests browse cabins, filter listings by capacity, view cabin details, select available dates, create reservations, manage existing bookings, update their guest profile, and sign in with Google to access a protected guest area.

## Tech Stack

- Next.js 14 App Router
- React 18
- Tailwind CSS
- NextAuth v5 beta with Google provider
- Supabase for database access
- `react-day-picker` for reservation date selection
- `date-fns` for date formatting and booking calculations
- Heroicons for UI icons

## Implemented Features

### Public Pages

- Landing page with hero background and CTA to explore cabins
- About page with brand content, family story, and dynamic cabin count
- Cabins listing page
- Individual cabin details page
- Dedicated login page
- Reservation confirmation thank-you page
- Custom global loading, error, and not-found handling

### Cabin Browsing

- Fetches cabins from Supabase
- Displays cabin name, capacity, pricing, discount pricing, and image
- Uses remote Supabase storage images or local `/public` images
- Filters cabins by guest capacity:
  - All cabins
  - 1 to 3 guests
  - 4 to 7 guests
  - 8 to 12 guests

### Cabin Details and Reservation Flow

- Shows full cabin details on `/cabins/[cabinId]`
- Displays blocked dates based on existing bookings
- Uses a range calendar for check-in/check-out selection
- Prevents selecting past dates
- Prevents selecting already booked ranges
- Enforces booking settings from the `settings` table
- Calculates:
  - number of nights
  - nightly pricing
  - discount pricing
  - total cabin price
- Supports reservation form submission with:
  - selected date range
  - number of guests
  - observations / stay notes
- Shows login prompt if the user is not authenticated
- Creates a booking through a server action
- Redirects to `/thank-you` after a successful reservation
- Passes confirmation details to the thank-you page via query params

### Authentication

- Google sign-in via NextAuth
- Custom sign-in page at `/login`
- Protected `/account` area through middleware
- Automatic guest record creation in Supabase on first sign-in
- Session enrichment with `guestId`
- Sign-out support from the sidebar

### Guest Area

- `/account` welcome page
- `/account/reservations` bookings overview
- `/account/profile` guest profile page
- Sidebar navigation for guest-area routes

### Reservation Management

- Loads all reservations for the authenticated guest
- Shows booking date, cabin image, guest count, price, and status
- Distinguishes past vs upcoming reservations
- Optimistic UI deletion for reservations
- Delete confirmation before removal
- Revalidates reservations after mutation
- Edit link is rendered for upcoming reservations

### Profile Management

- Loads guest profile from Supabase
- Displays full name and email
- Lets guests update:
  - nationality
  - country flag
  - national ID
- Validates national ID in a server action
- Revalidates profile data after update

### Brand and Content Updates

- Brand renamed from "The Wild Oasis" to "Nestoria" across the app
- Updated about-page branding and logo text
- Added a working confirmation page in both `app` and `starter`

### Starter Folder

The `starter/` directory is included as a parallel learning/reference area with starter-page and component versions. It includes:

- starter home page
- starter about page
- starter cabins page
- starter cabin page
- starter reservation edit page
- starter thank-you page
- starter reservation/date-selection components

## Project Structure

```text
app/
  _Components/        Reusable UI and client/server components
  _lib/               Auth, server actions, Supabase, data fetching
  _styles/            Global styles
  about/              About page
  account/            Protected guest area
  cabins/             Cabin listing and cabin details pages
  login/              Custom login page
  thank-you/          Reservation confirmation page

starter/
  components/         Starter/reference components
  pages/              Starter/reference pages
```

## Main Routes

- `/` home page
- `/about` about Nestoria
- `/cabins` cabin listing
- `/cabins/[cabinId]` single cabin page
- `/login` Google sign-in page
- `/thank-you` reservation confirmation page
- `/account` guest dashboard
- `/account/reservations` reservation management
- `/account/profile` guest profile update

## Data Sources

### Supabase Tables Used

- `cabins`
- `bookings`
- `guests`
- `settings`

### Cabin Images

Cabin images are not hardcoded in the listing cards. They come from the `image` field in the `cabins` table and are rendered in [app/_Components/CabinCard.js](/Users/sherysmac/Desktop/Udemy/ReactJS/nestoria-website/app/_Components/CabinCard.js).

Remote image support is configured in [next.config.mjs](/Users/sherysmac/Desktop/Udemy/ReactJS/nestoria-website/next.config.mjs) for Supabase storage:

- `jmhhxisfcpjjitjdkrtm.supabase.co/storage/v1/object/public/cabin-images/**`

## Environment Variables

Create a `.env.local` file with the following values:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_or_service_key
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
AUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

The exact keys required by your auth setup can vary, but the project code currently reads:

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run prod
npm run lint
```

## Notes

- The app uses App Router server components by default, with client components where interactivity is required.
- Reservation date state is shared through `ReservationContext`.
- Booking creation, profile updates, sign-in, sign-out, and deletion use server actions.
- `/account` routes are protected by `middleware.js`.
- The repo contains both the implemented app and the `starter/` reference code.
