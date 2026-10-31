# WeaveMart - The Online Marketplace

**WeaveMart** is a Direct-to-Consumer (D2C) e-commerce marketplace built with **Java Spring Boot 3** and **React 18** specifically for rural handloom weavers and fabric buyers, eliminating middleman exploitation.

---

## Validated Original Registration & Login Details

The application is pre-populated with authentic profiles and sample handloom products across famous craft clusters (Pochampally, Kanchipuram, Banaras, Fulia, Chanderi). 

### 1. Master Weaver Profile (Artisan Seller)
* **Email:** `weaver@weavemart.com`
* **Password:** `weaver123`
* **Role:** `WEAVER`
* **Artisan Name:** Rameshwar Chinta
* **Artisan Card / Pehchan ID:** `ART-TS-10492`
* **ID Proof Type:** Government Pehchan Card (Ministry of Textiles)
* **Verification Status:** `VERIFIED`
* **Loom Type:** Frame Loom & Pit Loom
* **Craft Region:** Pochampally (Telangana)
* **Phone:** `+91 98480 12345`

### 2. Heritage Weaver Profile (Kanchipuram Silk Artisan)
* **Email:** `shanmugam@weavemart.com`
* **Password:** `weaver123`
* **Role:** `WEAVER`
* **Artisan Name:** Shanmugam Mudaliar
* **Artisan Card / Pehchan ID:** `ART-TN-88301`
* **ID Proof Type:** National Handloom Artisan Identity Card
* **Verification Status:** `VERIFIED`
* **Loom Type:** Traditional Pit Loom
* **Craft Region:** Kanchipuram (Tamil Nadu)
* **Phone:** `+91 94432 56789`

### 3. Customer Profile (Fabric Buyer)
* **Email:** `customer@weavemart.com`
* **Password:** `customer123`
* **Role:** `CUSTOMER`
* **Customer Name:** Ananya Sharma
* **Address:** Flat 402, Royal Palms Apartments, Madhapur, Hyderabad, Telangana - 500081
* **Phone:** `+91 98112 34567`

> **Tip for Presentation & Testing:** 
> On the **Login** screen, you can click the **Quick Demo Credentials** autofill buttons to instantly switch between Weaver and Customer roles in 1 click!

---

## Deployment Options

WeaveMart is structured to support **both Unified (Single-Service) deployment** and **Separated (Frontend on Vercel + Backend on Render/Railway) deployment**.

---

### Option 1: Unified Single-Service Deployment (Recommended on Render / Railway / Docker)

Both the React frontend and Spring Boot backend can run together as a single container or executable JAR on a single port with zero CORS configuration needed.

#### Deploying on Render.com (Free Web Service):
1. Push your repository to **GitHub** or **GitLab**.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New + > Web Service**.
3. Connect your repository.
4. Select **Docker** as the Runtime (it will automatically detect the root `Dockerfile`).
5. Set the Environment Variable:
   - `PORT`: `8080` (or leave default, Render sets this automatically)
6. Click **Create Web Service**. Render builds the React app, packages it with Spring Boot, and deploys it live!

#### Deploying with Docker locally or on a VPS:
```bash
docker-compose up --build -d
```
Access the application at `http://localhost:8080`.

#### Building and Running the Unified JAR locally:
Windows:
```bat
build-all.bat
java -jar backend/target/weavemart-backend-1.0.0.jar
```
Linux / Mac:
```bash
chmod +x build-all.sh && ./build-all.sh
java -jar backend/target/weavemart-backend-1.0.0.jar
```

---

### Option 2: Split Deployment (Vercel Frontend + Render Backend)

#### A. Deploy Backend on Render / Railway:
1. Create a Web Service pointing to the `backend/` directory.
2. Build Command: `mvn clean package -DskipTests`
3. Start Command: `java -jar target/weavemart-backend-1.0.0.jar`
4. Copy your backend URL (e.g. `https://weavemart-api.onrender.com`).

#### B. Deploy Frontend on Vercel:
1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Set Root Directory to `frontend`.
3. Framework Preset: **Vite**.
4. Add Environment Variable:
   - `VITE_API_URL`: `https://weavemart-api.onrender.com`
5. Click **Deploy**. Vercel uses `frontend/vercel.json` to handle client-side routing rewrites.

---

## Database Configuration

The application defaults to a **persistent file-based H2 database** (`./data/weavemartdb`), which persists all registered users, newly uploaded products, and orders across server restarts.

### To use PostgreSQL / MySQL in Production:
Set the following environment variables in your cloud hosting provider:

#### PostgreSQL (e.g. Supabase, Neon, Render Postgres):
```env
SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:<port>/<dbname>
SPRING_DATASOURCE_DRIVER=org.postgresql.Driver
SPRING_DATASOURCE_USERNAME=<username>
SPRING_DATASOURCE_PASSWORD=<password>
```

#### MySQL:
```env
SPRING_DATASOURCE_URL=jdbc:mysql://<host>:<port>/<dbname>?createDatabaseIfNotExist=true&useSSL=true
SPRING_DATASOURCE_DRIVER=com.mysql.cj.jdbc.Driver
SPRING_DATASOURCE_USERNAME=<username>
SPRING_DATASOURCE_PASSWORD=<password>
```

---

## Local Development Mode

To run backend and frontend independently during development:

1. **Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   *Runs at `http://localhost:8080`*
   *H2 Database Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:file:./data/weavemartdb`, User: `sa`, Password: blank)*

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *Runs at `http://localhost:3000` (proxies `/api` requests to port `8080`)*
