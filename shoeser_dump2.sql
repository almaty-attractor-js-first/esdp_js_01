--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: role; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.role AS ENUM (
    'courier',
    'master',
    'manager',
    'admin'
);


ALTER TYPE public.role OWNER TO admin;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cleaningTypes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."cleaningTypes" (
    id character varying,
    "position" integer,
    name character varying,
    title character varying,
    price integer,
    status boolean
);


ALTER TABLE public."cleaningTypes" OWNER TO admin;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.clients (
    id character varying NOT NULL,
    email character varying,
    "firstName" character varying,
    phone character varying,
    "lastName" character varying,
    "middleName" character varying,
    address character varying,
    "createdAt" timestamp without time zone,
    "birthDate" date
);


ALTER TABLE public.clients OWNER TO admin;

--
-- Name: orderItems; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."orderItems" (
    id character varying,
    "orderId" character varying,
    "cleaningType" character varying,
    qty integer,
    price integer,
    title character varying
);


ALTER TABLE public."orderItems" OWNER TO admin;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.orders (
    id character varying NOT NULL,
    "clientId" character varying,
    "masterId" character varying,
    "courierId" character varying,
    "statusId" character varying,
    "createdAt" timestamp without time zone DEFAULT now(),
    description character varying,
    "paymentStatus" boolean,
    "paymentMethod" character varying,
    "totalPrice" integer,
    "pickupAddress" character varying,
    "deliveryAddress" character varying,
    "deliveryType" character varying,
    "completedDate" timestamp without time zone
);


ALTER TABLE public.orders OWNER TO admin;

--
-- Name: pickupPoints; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."pickupPoints" (
    id character varying,
    address character varying,
    title character varying,
    status boolean,
    lat character varying,
    lng character varying
);


ALTER TABLE public."pickupPoints" OWNER TO admin;

--
-- Name: statuses; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.statuses (
    id character varying NOT NULL,
    name character varying,
    title character varying,
    color character varying,
    status boolean,
    "position" integer
);


ALTER TABLE public.statuses OWNER TO admin;

--
-- Name: workers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.workers (
    phone numeric NOT NULL,
    email character varying,
    password character varying,
    id character varying NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    status boolean DEFAULT true,
    "createdAt" timestamp without time zone DEFAULT now(),
    "birthDate" date,
    "hireDate" date,
    "dismissalDate" date,
    "ordersDone" integer,
    "totalOrdersCost" integer,
    role public.role DEFAULT 'master'::public.role NOT NULL,
    token character varying(255)
);


ALTER TABLE public.workers OWNER TO admin;

--
-- Data for Name: cleaningTypes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."cleaningTypes" (id, "position", name, title, price, status) FROM stdin;
AC55FF88-EF36-4A62-9464-4A084CB533D1	1	sneakers	Кроссовки	1000	t
11A1BCFA-DAD4-454F-896A-2C894A29998D	2	boots	Ботинки	1500	t
7583926E-9385-4DED-B91A-4CC85ED1B938	3	rollerskates	Роликовые коньки	700	t
40285F8B-0550-4E75-AE0D-C00B67EDA661	4	highboots	Сапоги	2000	t
6B400705-31D1-4123-9564-4664DF89B299	5	cheshki	Чешки	10000	t
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.clients (id, email, "firstName", phone, "lastName", "middleName", address, "createdAt", "birthDate") FROM stdin;
7d4477a8-114f-44c3-9df3-4429233e03a7	greenmassa@gmail.com	Dauren	+7 573 627 2627	Akhmetov	\N	Djandisov 10	2019-09-13 21:27:23.525	\N
511ce657-fe3d-404e-a97c-fbbd19523cd2	greenmassa@gmail.com	Dauren	+7 089 880 9798	Akhmetov	\N	Djandisov 10	2019-09-13 21:40:48.437	\N
e310c401-2ae0-4090-a8e0-50633f2cb3da	greenmassa@gmail.com	Dauren	+7 222 222 3331	Akhmetov	\N	Djandisov 10	2019-09-13 21:42:40.41	\N
7aac46c8-9ed9-45e9-a401-800cfe32b40b	greenmassa@gmail.com	Dauren	+7 123 144 1515	Akhmetov	\N	Djandisov 10	2019-09-13 21:45:44.932	\N
24a5ab8a-4cdf-4bf7-992f-634ad32e1796	greenmassa@gmail.com	Dauren	+7 123 123 1231	Akhmetov	\N	Djandisov 10	2019-09-14 17:18:44.106	\N
\.


--
-- Data for Name: orderItems; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."orderItems" (id, "orderId", "cleaningType", qty, price, title) FROM stdin;
6a71f38d-e5a3-4d8e-8ba4-ed604287d347	4049cdd8-72fd-45e6-886c-a34c11073465	rollerskates	1	700	Роликовые коньки
4e36ebd9-2128-4559-a2b7-c8ec0200f115	4049cdd8-72fd-45e6-886c-a34c11073465	rollerskates	1	700	Роликовые коньки
8f379924-5a1c-4cd4-8294-fc0351328295	9127e896-acfb-47ec-9785-347992f15a78	boots	1	1500	Ботинки
4cc1a89f-b436-465a-8745-67cdbf1983c1	f4a42f73-13ce-451e-b4ef-3d58c1a8c693	rollerskates	1	700	Роликовые коньки
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.orders (id, "clientId", "masterId", "courierId", "statusId", "createdAt", description, "paymentStatus", "paymentMethod", "totalPrice", "pickupAddress", "deliveryAddress", "deliveryType", "completedDate") FROM stdin;
4049cdd8-72fd-45e6-886c-a34c11073465	7aac46c8-9ed9-45e9-a401-800cfe32b40b	\N	\N	\N	2019-09-13 21:45:44.949	\N	\N	cash	1400	Djandisov 10	Djandisov 10	delivery	2019-09-20 14:49:00
9127e896-acfb-47ec-9785-347992f15a78	e310c401-2ae0-4090-a8e0-50633f2cb3da	\N	\N	\N	2019-09-13 21:46:09.234	\N	\N	cash	1500	Djandisov 10	Djandisov 10	delivery	2019-09-20 14:49:00
f4a42f73-13ce-451e-b4ef-3d58c1a8c693	24a5ab8a-4cdf-4bf7-992f-634ad32e1796	\N	\N	\N	2019-09-14 17:18:44.119	\N	\N	cash	700	Djandisov 10	Djandisov 10	delivery	2019-09-22 15:34:00
\.


--
-- Data for Name: pickupPoints; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."pickupPoints" (id, address, title, status, lat, lng) FROM stdin;
\.


--
-- Data for Name: statuses; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.statuses (id, name, title, color, status, "position") FROM stdin;
89c15fa7-18d2-4c18-9f93-fe458e579019	new	К забору	#2196f3	t	2
32363a0f-ba50-4c84-9c6c-7be28ac11954	delivered	Доставлено	#1b5e20	t	3
7bda23cd-b38f-4353-b159-331582b0357e	delivering	Доставляется	#00bcd4	t	4
ed664a73-3aa9-4fa9-941e-fac0f79ad7ea	pending	В ожидании	#ffeb3b	t	5
e1cb9c5f-6c0a-4519-8932-6c2d3db8904f	inWork	В работе	#4caf50	t	6
fff52cde-740c-46d3-bad6-167dbad075dc	qweqw	Тайлйал	#536dfe	t	1
\.


--
-- Data for Name: workers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.workers (phone, email, password, id, "firstName", "lastName", status, "createdAt", "birthDate", "hireDate", "dismissalDate", "ordersDone", "totalOrdersCost", role, token) FROM stdin;
77777777777	master@gmail.com	$2b$08$4uBj2cxkAZgc0IZYSn/sjuSyQ9qT//yU3umoBoxre2C7JJsomZHDS	1aa405be-646c-4723-aa24-45cff1058dd8	master	masterov	t	2019-09-13 20:15:08.758624	\N	\N	\N	\N	\N	master	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYWE0MDViZS02NDZjLTQ3MjMtYWEyNC00NWNmZjEwNThkZDgiLCJpYXQiOjE1NjgzODQxMDgsImV4cCI6MTU2ODM4NzcwOH0.psOfZGg0A5354aFwBIIGzC2o8LZRsiaVBykSS_BTA80
71111111111	courier@gmail.com	$2b$08$.fL2/0wXw/.4DlXYJuoJQO5L4vNCkY453KW.BNC00dXBePF07ebxm	f8d07286-0f11-4b72-8e05-12586bad0964	Курьер	Михалыч	t	2019-09-13 20:15:43.542247	\N	\N	\N	\N	\N	master	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmOGQwNzI4Ni0wZjExLTRiNzItOGUwNS0xMjU4NmJhZDA5NjQiLCJpYXQiOjE1NjgzODQxNDMsImV4cCI6MTU2ODM4Nzc0M30.NkqgxcswGxvXAC_GsfcAPsMZj5H5oACIkIGtXtwurtk
72222222222	sgsgen@gmail.com	$2b$08$Qek1sNxtvgw0bNBo5nHo3.O4qlMEyH9MJDBkHhp9AhDZky93M3Xt.	85e19c20-8dde-480d-8fe7-b889955179f2	Gena	gena	t	2019-09-14 17:21:03.618839	\N	\N	\N	\N	\N	master	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NWUxOWMyMC04ZGRlLTQ4MGQtOGZlNy1iODg5OTU1MTc5ZjIiLCJpYXQiOjE1Njg0NjAwNjMsImV4cCI6MTU2ODQ2MzY2M30.-Ps0qmlY-x9o7mIjDwmPCnR_9-RMfxMUVcq0kY0PuJE
77471113333	greenmassa@gmail.com	$2b$08$a.wuyTU9vDgEEW8xq2FiIuHgICzngmWSILELWD/MFeutK2x409c/K	f7b84138-bf98-4553-8189-9b81276d5edd	Dauren	Akhmetov	t	2019-09-13 20:05:37.363353	\N	\N	\N	\N	\N	admin	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmN2I4NDEzOC1iZjk4LTQ1NTMtODE4OS05YjgxMjc2ZDVlZGQiLCJpYXQiOjE1Njg5ODk1NjcsImV4cCI6MTU2ODk5MzE2N30.a8bUblismh_bq0ERkVattLRhvIwECnMeVLfoLenFq5o
\.


--
-- Name: cleaningTypes cleaningTypes_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."cleaningTypes"
    ADD CONSTRAINT "cleaningTypes_id_key" UNIQUE (id);


--
-- Name: clients clients_phone_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_phone_key UNIQUE (phone);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: orderItems orderItems_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."orderItems"
    ADD CONSTRAINT "orderItems_id_key" UNIQUE (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: pickupPoints pickupPoints_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."pickupPoints"
    ADD CONSTRAINT "pickupPoints_id_key" UNIQUE (id);


--
-- Name: statuses statuses_name_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_name_key UNIQUE (name);


--
-- Name: statuses statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (id);


--
-- Name: statuses statuses_title_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_title_key UNIQUE (title);


--
-- Name: workers workers_password_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.workers
    ADD CONSTRAINT workers_password_key UNIQUE (password);


--
-- Name: workers workers_phone_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.workers
    ADD CONSTRAINT workers_phone_key UNIQUE (phone);


--
-- Name: workers workers_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.workers
    ADD CONSTRAINT workers_pkey PRIMARY KEY (id);


--
-- Name: orderItems orderItems_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."orderItems"
    ADD CONSTRAINT "orderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id);


--
-- Name: orders orders_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public.clients(id);


--
-- Name: orders orders_courierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES public.workers(id);


--
-- Name: orders orders_masterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES public.workers(id);


--
-- Name: orders orders_statusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES public.statuses(id);


--
-- PostgreSQL database dump complete
--

