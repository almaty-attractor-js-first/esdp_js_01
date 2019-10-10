--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-0ubuntu0.19.04.1)
-- Dumped by pg_dump version 11.5 (Ubuntu 11.5-0ubuntu0.19.04.1)

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
    'nobody',
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
    address character varying,
    "deliveryType" character varying,
    "completedDate" timestamp without time zone
);


ALTER TABLE public.orders OWNER TO admin;

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
-- Name: orders_with_status_fields; Type: VIEW; Schema: public; Owner: admin
--

CREATE VIEW public.orders_with_status_fields AS
 SELECT o.id,
    o."clientId",
    o."masterId",
    o."courierId",
    o."statusId",
    o."createdAt",
    o.description,
    o."paymentStatus",
    o."paymentMethod",
    o."totalPrice",
    o."pickupAddress",
    o.address,
    o."deliveryType",
    o."completedDate",
    s.name AS "statusName",
    s.id AS "currentStatus"
   FROM (public.orders o
     LEFT JOIN public.statuses s ON (((o."statusId")::text = (s.id)::text)));


ALTER TABLE public.orders_with_status_fields OWNER TO admin;

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
-- Name: statuses_with_readonly; Type: VIEW; Schema: public; Owner: admin
--

CREATE VIEW public.statuses_with_readonly AS
 SELECT s.id,
    s.name,
    s.title,
    s.color,
    s.status,
    s."position",
    (COALESCE(o.count, (0)::bigint) > 0) AS key_readonly
   FROM (public.statuses s
     LEFT JOIN ( SELECT orders."statusId",
            count(orders."statusId") AS count
           FROM public.orders
          WHERE (orders."statusId" IS NOT NULL)
          GROUP BY orders."statusId") o ON (((s.id)::text = (o."statusId")::text)));


ALTER TABLE public.statuses_with_readonly OWNER TO admin;

--
-- Name: workers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.workers (
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
    phone numeric NOT NULL,
    email character varying,
    password character varying,
    token character varying(255),
    role public.role DEFAULT 'master'::public.role NOT NULL
);


ALTER TABLE public.workers OWNER TO admin;

--
-- Data for Name: cleaningTypes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."cleaningTypes" (id, "position", name, title, price, status) FROM stdin;
ac44a893-56ea-4171-a06b-6aadf9ce5548\n	2	boots	Ботинки	2500	t
2bc47dd2-20bf-4b07-a72a-59724a344e38	3	sneakers	Кроссовки	1500	t
17d13b3e-b131-4c23-b529-055b726a12e5	4	qweqwe	qweqwe	234234	f
c4b2d707-5341-4cca-a05b-47aba47df95f	1	rubberBoots	Резиновые сапоги	700	t
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.clients (id, email, "firstName", phone, "lastName", "middleName", address, "createdAt", "birthDate") FROM stdin;
1bd27728-11a9-4716-9062-6a91eea1cb99	james_bond@misix.com	James	76666666666	Bond	undefined	The Vauxhall Cross SIS Building, London	2019-09-18 18:34:16.131	\N
77baa2db-52df-4d79-ad4d-955360408097	lucky_strike@strike.bg	Lucky	77777777777	Strike	undefined	 Far Far Away Kingdom	2019-09-19 20:26:55.651	\N
3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	sgsgen@gmail.com	Gennadiy	77772894350	Gareev	undefined	Достык 111	2019-09-07 18:01:45.218	\N
9f64da35-5edb-46f2-88f1-921860a53919	sgsgen@gmail.com	Tri	73333333333	Four	undefined	Абая Саина 54	2019-10-02 16:25:31.787	\N
ef5e86ec-de8b-4cf2-a805-24df4dd4117e	jkab@kabj.mix	James	78888888888	Кабыкенов		Абая Саина 54	2019-09-19 20:25:46.471	\N
\.


--
-- Data for Name: orderItems; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."orderItems" (id, "orderId", "cleaningType", qty, price, title) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.orders (id, "clientId", "masterId", "courierId", "statusId", "createdAt", description, "paymentStatus", "paymentMethod", "totalPrice", "pickupAddress", address, "deliveryType", "completedDate") FROM stdin;
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
6f29b666-272d-4192-9e67-fe4b87fd799a	rejected	Отклонен	#d50000	f	11
a708c4b0-e3b8-4480-89bf-2ab23fc54f85	pending	В обработке	#26a69a	t	4
1203a5ac-3fcd-443a-a1c5-cf9de24026c3	done	Готов	#fbc02d	t	6
7d088a66-ded7-448a-a58a-f4bed44a1433	inWork	В работе	#ffeb3b	t	5
847566a8-7b0b-4903-88b9-fec286195a0e	delivered	Доставлен	#ff80ab	f	9
f2f2b5cd-efc9-4df3-81ec-f834795b1a36	taken	Принят у клиента	#03a9f4	t	3
0e259504-a9e4-4b7a-bc89-1539b85546b5	canceled	Отменен	#9e9e9e	f	8
30a7f022-7e4e-4de9-ad64-788607c09b37	completed	Завершен	#00c853	t	10
804f3183-a866-49e4-ad4c-c9a6e00ed5bf	pickup	В заборе	#ffc107	t	2
ab91578d-693b-416f-8e77-9210b347f89a	delivering	В доставке	#4caf50	t	7
80659b19-1bf5-466b-8221-bce9ab456efb	new	Новый	#ba68c8	t	1
\.


--
-- Data for Name: workers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.workers (id, "firstName", "lastName", status, "createdAt", "birthDate", "hireDate", "dismissalDate", "ordersDone", "totalOrdersCost", phone, email, password, token, role) FROM stdin;
5ab3229b-3706-47de-a26f-8479904a1a98	Vasya	Petkin	t	2019-09-12 21:18:58.86325	\N	\N	\N	\N	\N	77777777777	admin@adminmail.net	$2b$08$gWBanUCjEUx1mVEq4uII.OH7P9aqAexhkMam2wjfo.8.XDCAp9n16	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YWIzMjI5Yi0zNzA2LTQ3ZGUtYTI2Zi04NDc5OTA0YTFhOTgiLCJpYXQiOjE1Njg5NzcxMDMsImV4cCI6MTU2ODk4MDcwM30.eF-YIol_qb--ZJt9b_GvEPbEAh1BqEiMIFSUBWXBKX8	master
ff35c2dd-97bc-44b8-bc25-1d756be13fa7	Не 	назначен	t	2019-09-22 15:08:00.375673	\N	\N	\N	\N	\N	70100101101	nobody@nobody.z	$2b$08$rzo3wfsOiAe8JpxhhBzWU.59NVJ6PKu/U/ibFkeSxoge/2a07TvAi	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmZjM1YzJkZC05N2JjLTQ0YjgtYmMyNS0xZDc1NmJlMTNmYTciLCJpYXQiOjE1NjkxNDMyODAsImV4cCI6MTU2OTE0Njg4MH0.DBPs29I9qCjv8km3zv135vnzdQqc2Hr09AU695E_htA	nobody
38319462-07d5-4b7e-a20e-b69992369231	Admin	Adminov	t	2019-10-06 12:20:19.295665	\N	\N	\N	\N	\N	77897897897	admin@adminmail.min	$2b$08$QSAL1XWtoxQbiDK2LOfzduCu9JbHbmBvhEXqy6CjsgtQe80u8DcMK	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzODMxOTQ2Mi0wN2Q1LTRiN2UtYTIwZS1iNjk5OTIzNjkyMzEiLCJpYXQiOjE1NzAzNDI4NDEsImV4cCI6MTU3MDM0NjQ0MX0.Tn7RnYbnY1mWKdEqsyxquSJw24rV9myGIavWY5KxnYg	admin
6c926f69-d838-4d34-9ae2-85f79dd53d8b	Flash	Inthenight	t	2019-10-07 14:41:23.569411	\N	\N	\N	\N	\N	71234567890	courier@courier.sho	$2b$08$qjJxdKWY9bs2YJwvc3uEJeBbgnNfI0Ff3Qdt8Dp9BbIWxGMvNNq0C	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YzkyNmY2OS1kODM4LTRkMzQtOWFlMi04NWY3OWRkNTNkOGIiLCJpYXQiOjE1NzA0Mzc2ODMsImV4cCI6MTU3MDQ0MTI4M30.FMhJ9Qj0eh116sEcZRwWFTofwTPW8E_DyaIDaok7Ic8	courier
3e732afb-002d-49cf-9364-6a8bcea92c8a	Forest	Gamp	t	2018-09-19 18:10:02.068	\N	\N	\N	\N	\N	71231231231	sgsgen@gmail.com	$2b$08$mvTsCcWOMFfC/4z2oHRUDOe6tjsPuNQrd3y.f5D/o3saTD8H9N.vC	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzZTczMmFmYi0wMDJkLTQ5Y2YtOTM2NC02YThiY2VhOTJjOGEiLCJpYXQiOjE1NzA2NDk2MzYsImV4cCI6MTU3MDY1MzIzNn0.ywJkoE6ashONJAM2h361dK1wmrCzJuxrgtrornXCQ-0	courier
86891450-bf7a-4d9b-bc93-48080069bddd	Anthony	Stark	t	2019-09-22 22:24:24.987116	\N	\N	\N	\N	\N	71111111111	master@master.z	$2b$08$1K71bIZ/O61RAmKRb092TuvphvZRXv7KV7t4YF9hM35AcyfBy1vlC	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4Njg5MTQ1MC1iZjdhLTRkOWItYmM5My00ODA4MDA2OWJkZGQiLCJpYXQiOjE1NzA0NDkzNDIsImV4cCI6MTU3MDQ1Mjk0Mn0.AbmqQnyebn84mVRaTmp74xl7prD46YiV3xP9uLT2R2g	master
8d6ced26-273f-4887-ac8c-39e8c563f8d4	Gena	Gareev	t	2019-09-11 18:40:59.22013	\N	\N	\N	\N	\N	77772894350	sgsgen@gmail.com	$2b$08$fOdSjRSuLsSklDImfviLH.rToT6cOvTtI/mab7U.OXYKM3QGZDNKi	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZDZjZWQyNi0yNzNmLTQ4ODctYWM4Yy0zOWU4YzU2M2Y4ZDQiLCJpYXQiOjE1NzA2OTg0MjQsImV4cCI6MTU3MDcwMjAyNH0.WW9dM_3JA2B8K-KPP8RhEG-x1EfdTj6TPRM7gW7PfM8	admin
f7d5b6bc-018e-46c5-9f5e-0857c0da7c42	James	Bond	t	2019-09-19 16:26:50.515385	\N	\N	\N	\N	\N	75555555555	sgsgen@gmail.com	$2b$08$g9KCNjEJ3P/F16j4wepXCeTzGNODBbSJnLR7tpwsLgY2hUUKlddya	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmN2Q1YjZiYy0wMThlLTQ2YzUtOWY1ZS0wODU3YzBkYTdjNDIiLCJpYXQiOjE1NzA2NDEyOTQsImV4cCI6MTU3MDY0NDg5NH0.0dWb808YBctMf9M3d6WmJQTu7A83kHRuPXQi8R7hWis	master
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
-- Name: workers workers_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.workers
    ADD CONSTRAINT workers_pkey PRIMARY KEY (id);


--
-- Name: workers_phone_uindex; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX workers_phone_uindex ON public.workers USING btree (phone);


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

