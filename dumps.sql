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
2bc47dd2-20bf-4b07-a72a-59724a344e38	1	sneakers	Кроссовки	1500	t
ac44a893-56ea-4171-a06b-6aadf9ce5548\n	2	boots	Ботинки	2500	t
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.clients (id, email, "firstName", phone, "lastName", "middleName", address, "createdAt", "birthDate") FROM stdin;
e4c8f56b-4384-4ce8-82cd-7dd2b5cf6515	user@user.com	Чингиз	+7 707 807 1180	Кабыкенов	\N	1 микрорайон д.46	2019-09-13 20:55:09.956	\N
8a5590a9-15a2-4578-a48c-587ea0cbe5b7	hello@gmail.com	James	+7 444 444 4444	Bond	\N	Lalala st 555	2019-09-13 21:40:28.225	\N
d95b8bb1-cbf5-432a-8b05-c0d0cfdae165	user@user.com	Vasya	+7 777 777 7777	Petkin	\N	1 микрорайон д.46	2019-09-16 17:00:50.941	\N
0e6d53d1-f85d-408e-a82f-bfb4837497b9	\N	\N	+77778885522	\N	\N	\N	2019-09-16 17:24:17.95	\N
1bd27728-11a9-4716-9062-6a91eea1cb99	sgsgen@gmail.com	James	76666666666	Bond	\N	Lalala st 555	2019-09-18 18:34:16.131	\N
3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	sgsgen@gmail.com	Gennadiy	77772894350	Gareev	\N	Достык 111	2019-09-07 18:01:45.218	\N
ef5e86ec-de8b-4cf2-a805-24df4dd4117e	World	James	78888888888	Кабыкенов	\N	Абая Саина 54	2019-09-19 20:25:46.471	\N
77baa2db-52df-4d79-ad4d-955360408097	sgsgen@gmail.com	James	77777777777	Bond	\N	Достык 222	2019-09-19 20:26:55.651	\N
\.


--
-- Data for Name: orderItems; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."orderItems" (id, "orderId", "cleaningType", qty, price, title) FROM stdin;
a3f906a2-a208-4905-9468-6613baed5414	629b7fb9-9585-45e6-bbf9-c84c4d47f4b8	sneakers	1	1500	Кроссовки
b85c7c7c-3c92-4341-81bb-8abc2cd7e775	9cb6b9be-5a28-47e5-909c-89c9222f8ccd	boots	1	2500	Ботинки
f9a889af-b91e-4923-8432-5f605af36a94	e69c3dae-21c3-4ad8-87c9-6f9b8a6adb41	sneakers	1	1500	Кроссовки
b5249b64-3f96-4947-b253-d7d75ce493fe	e69c3dae-21c3-4ad8-87c9-6f9b8a6adb41	boots	1	2500	Ботинки
a0739757-6743-4f14-9120-88f526dc97aa	7afdd0a8-a302-4998-a2f4-22aabd9ae9fa	sneakers	1	1500	Кроссовки
f0662538-3bda-41f2-83bf-f58470220f1c	7afdd0a8-a302-4998-a2f4-22aabd9ae9fa	boots	1	2500	Ботинки
75d69aab-b65f-47b6-9c84-dfc8de15a5a6	d4102c7b-7f49-41c1-b530-0ca17c692042	sneakers	1	1500	Кроссовки
47201cc3-f693-4c9b-81ae-ef6f0c603d27	10da873b-769c-47d6-836f-5cad7f1fd715	sneakers	2	1500	Кроссовки
090772b2-eb93-447b-a900-72bc17bf2282	e5e0788e-df3c-463a-8d05-da1bc16121e1	sneakers	1	1500	Кроссовки
1e69072f-68ea-4bae-ae13-2527f13f984c	e5e0788e-df3c-463a-8d05-da1bc16121e1	sneakers	1	1500	Кроссовки
4158c515-e49f-4cfa-8efd-3226043b6cb8	e5e0788e-df3c-463a-8d05-da1bc16121e1	boots	1	2500	Ботинки
d1bfae70-ff5b-45fb-bac0-0b27b4427d3f	8aeb0fac-a4cb-4e3e-9d31-1830865abf54	sneakers	1	1500	Кроссовки
c4549081-a440-44de-ac6b-f97328f5f8b8	8aeb0fac-a4cb-4e3e-9d31-1830865abf54	boots	9	2500	Ботинки
755ae395-732d-4a71-863f-9cbfc541bf07	61fc0583-5ffa-46e7-b443-225073e64441	boots	1	2500	Ботинки
113aa96a-09fc-4d8e-9cf7-1765ce3ec9e1	250d387e-591c-4be3-bef8-ba82923bbb29	boots	1	2500	Ботинки
9970715d-6359-4ca5-812d-f5f727871e42	07b77e85-bd0d-4923-b05d-a51bf3a3e14b	sneakers	1	1500	Кроссовки
19b195df-44aa-4d62-ae3b-3a715392fd48	6afeb53e-5046-4e09-90a7-24be9e9c3715	boots	1	2500	Ботинки
ea526630-12ec-4e9d-8e1f-6726d00a590d	7ea3450d-3fd2-4de0-95c1-11cf8759aa4d	sneakers	1	1500	Кроссовки
e17a1be9-da2a-4a91-8892-8d5ad985f09c	7ea3450d-3fd2-4de0-95c1-11cf8759aa4d	sneakers	1	1500	Кроссовки
435ef62a-55c4-4a85-bf35-7a0abc4e4caa	7ea3450d-3fd2-4de0-95c1-11cf8759aa4d	sneakers	1	1500	Кроссовки
c1c63edc-3211-402c-8428-288442c2bc50	7ea3450d-3fd2-4de0-95c1-11cf8759aa4d	sneakers	1	1500	Кроссовки
ecd79d9f-c9ac-41f3-9402-c74326860596	81b008fe-eeb8-47eb-81fe-7212e2a53d85	sneakers	1	1500	Кроссовки
88a3ee57-d890-48ac-a006-8fe6d69013d9	4eb7b563-4dc2-4c14-9648-7292c03258f2	sneakers	4	1500	Кроссовки
ef992ef5-7244-45f7-8644-04fdbc3f3bf4	4eb7b563-4dc2-4c14-9648-7292c03258f2	boots	3	2500	Ботинки
cd69bfc3-000e-4254-92b7-962dfffa7879	3a7efbaa-2862-4c75-8b8c-5e9ceb4d1e20	sneakers	1	1500	Кроссовки
292070f8-4773-47bc-8bfa-502e3dd4a580	24e7f777-a0a2-4730-b813-3ac92ca4fc44	boots	1	2500	Ботинки
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.orders (id, "clientId", "masterId", "courierId", "statusId", "createdAt", description, "paymentStatus", "paymentMethod", "totalPrice", "pickupAddress", address, "deliveryType", "completedDate") FROM stdin;
9cb6b9be-5a28-47e5-909c-89c9222f8ccd	3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	86891450-bf7a-4d9b-bc93-48080069bddd	3e732afb-002d-49cf-9364-6a8bcea92c8a	ab91578d-693b-416f-8e77-9210b347f89a	2019-09-17 17:51:09.156	\N	t	cash	2500	Достык 111	Достык 111	delivery	2019-09-22 03:10:00
61fc0583-5ffa-46e7-b443-225073e64441	3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	f7d5b6bc-018e-46c5-9f5e-0857c0da7c42	3e732afb-002d-49cf-9364-6a8bcea92c8a	7d088a66-ded7-448a-a58a-f4bed44a1433	2019-09-17 20:45:13.23	\N	t	cash	2500	Достык 111	Достык 111	delivery	2019-09-22 03:10:00
10da873b-769c-47d6-836f-5cad7f1fd715	3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	3e732afb-002d-49cf-9364-6a8bcea92c8a	ab91578d-693b-416f-8e77-9210b347f89a	2019-09-17 20:22:11.608	\N	t	cash	3000	Достык 111	Достык 111	delivery	2019-09-22 03:10:00
8aeb0fac-a4cb-4e3e-9d31-1830865abf54	d95b8bb1-cbf5-432a-8b05-c0d0cfdae165	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	80659b19-1bf5-466b-8221-bce9ab456efb	2019-09-17 20:42:50.61	\N	t	cash	24000	1 микрорайон д.46	1 микрорайон д.46	delivery	2019-09-22 03:10:00
e5e0788e-df3c-463a-8d05-da1bc16121e1	3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	80659b19-1bf5-466b-8221-bce9ab456efb	2019-09-17 20:22:32.442	\N	t	cash	5500	Достык 111	Достык 111	delivery	2019-09-22 03:10:00
07b77e85-bd0d-4923-b05d-a51bf3a3e14b	d95b8bb1-cbf5-432a-8b05-c0d0cfdae165	86891450-bf7a-4d9b-bc93-48080069bddd	3e732afb-002d-49cf-9364-6a8bcea92c8a	7d088a66-ded7-448a-a58a-f4bed44a1433	2019-09-17 20:53:39.264	\N	t	cash	1500	1 микрорайон д.46	1 микрорайон д.46	delivery	2019-09-22 03:10:00
e69c3dae-21c3-4ad8-87c9-6f9b8a6adb41	3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	ab91578d-693b-416f-8e77-9210b347f89a	2019-09-17 19:08:12.592	\N	t	cash	4000	Достык 111	Достык 111	delivery	2019-09-22 03:10:00
81b008fe-eeb8-47eb-81fe-7212e2a53d85	3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	3e732afb-002d-49cf-9364-6a8bcea92c8a	7d088a66-ded7-448a-a58a-f4bed44a1433	2019-09-19 20:39:01.653	\N	t	cash	1500	Достык 111	Достык 111	delivery	2019-09-24 10:43:25.716
6afeb53e-5046-4e09-90a7-24be9e9c3715	3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	f7d5b6bc-018e-46c5-9f5e-0857c0da7c42	3e732afb-002d-49cf-9364-6a8bcea92c8a	7d088a66-ded7-448a-a58a-f4bed44a1433	2019-09-17 20:55:06.21	\N	t	cash	2500	Достык 111	Достык 111	delivery	2019-09-22 03:10:00
7ea3450d-3fd2-4de0-95c1-11cf8759aa4d	1bd27728-11a9-4716-9062-6a91eea1cb99	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	3e732afb-002d-49cf-9364-6a8bcea92c8a	7d088a66-ded7-448a-a58a-f4bed44a1433	2019-09-19 01:20:41.156	\N	t	cash	6000	Lalala st 555	Lalala st 555	delivery	2019-09-28 03:10:00
7afdd0a8-a302-4998-a2f4-22aabd9ae9fa	3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	ab91578d-693b-416f-8e77-9210b347f89a	2019-09-17 19:08:58.538	\N	t	cash	4000	Достык 111	Достык 111	delivery	2019-09-22 03:10:00
d4102c7b-7f49-41c1-b530-0ca17c692042	3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	86891450-bf7a-4d9b-bc93-48080069bddd	3e732afb-002d-49cf-9364-6a8bcea92c8a	ab91578d-693b-416f-8e77-9210b347f89a	2019-09-17 20:09:51.231	\N	t	cash	1500	Достык 111	Достык 111	delivery	2019-09-22 03:10:00
4eb7b563-4dc2-4c14-9648-7292c03258f2	3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	1203a5ac-3fcd-443a-a1c5-cf9de24026c3	2019-09-25 15:16:45.472	\N	t	cash	13500	Достык 111	Достык 111	self	2019-09-30 10:43:25.949
629b7fb9-9585-45e6-bbf9-c84c4d47f4b8	3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	86891450-bf7a-4d9b-bc93-48080069bddd	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	1203a5ac-3fcd-443a-a1c5-cf9de24026c3	2019-09-17 17:47:58.772	\N	t	cash	1500	Достык 111	Достык 111	delivery	2019-09-22 03:10:00
24e7f777-a0a2-4730-b813-3ac92ca4fc44	3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	1203a5ac-3fcd-443a-a1c5-cf9de24026c3	2019-09-25 15:34:27.586	\N	t	cash	2500	Достык 111	Достык 111	delivery	2019-09-30 10:43:25.949
3a7efbaa-2862-4c75-8b8c-5e9ceb4d1e20	3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	ff35c2dd-97bc-44b8-bc25-1d756be13fa7	80659b19-1bf5-466b-8221-bce9ab456efb	2019-09-25 15:24:29.431	\N	t	cash	1500	Достык 111	Достык 111	delivery	2019-09-30 08:39:56.345
250d387e-591c-4be3-bef8-ba82923bbb29	3b846dda-dbf0-42fa-a0cc-d39e3c3a8704	5ab3229b-3706-47de-a26f-8479904a1a98	3e732afb-002d-49cf-9364-6a8bcea92c8a	a708c4b0-e3b8-4480-89bf-2ab23fc54f85	2019-09-17 20:51:29.897	\N	t	cash	2500	Достык 111	Достык 111	delivery	2019-09-22 03:10:00
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
847566a8-7b0b-4903-88b9-fec286195a0e	delivered	Доставлен	#ff80ab	f	8
0e259504-a9e4-4b7a-bc89-1539b85546b5	canceled	Отменен	#9e9e9e	f	7
80659b19-1bf5-466b-8221-bce9ab456efb	new	Новый	#4caf50	t	1
a708c4b0-e3b8-4480-89bf-2ab23fc54f85	pending	В обработке	#26a69a	t	2
7d088a66-ded7-448a-a58a-f4bed44a1433	inWork	В работе	#ffeb3b	t	3
ab91578d-693b-416f-8e77-9210b347f89a	delivering	В доставке	#00bcd4	t	6
30a7f022-7e4e-4de9-ad64-788607c09b37	completed	Завершен	#00c853	f	9
6f29b666-272d-4192-9e67-fe4b87fd799a	rejected	Отклонен	#d50000	f	10
f2f2b5cd-efc9-4df3-81ec-f834795b1a36	taken	Принят у клиента	#03a9f4	t	4
1203a5ac-3fcd-443a-a1c5-cf9de24026c3	done	Готов	#fbc02d	t	5
\.


--
-- Data for Name: workers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.workers (id, "firstName", "lastName", status, "createdAt", "birthDate", "hireDate", "dismissalDate", "ordersDone", "totalOrdersCost", phone, email, password, token, role) FROM stdin;
5ab3229b-3706-47de-a26f-8479904a1a98	Vasya	Petkin	t	2019-09-12 21:18:58.86325	\N	\N	\N	\N	\N	77777777777	admin@adminmail.net	$2b$08$gWBanUCjEUx1mVEq4uII.OH7P9aqAexhkMam2wjfo.8.XDCAp9n16	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YWIzMjI5Yi0zNzA2LTQ3ZGUtYTI2Zi04NDc5OTA0YTFhOTgiLCJpYXQiOjE1Njg5NzcxMDMsImV4cCI6MTU2ODk4MDcwM30.eF-YIol_qb--ZJt9b_GvEPbEAh1BqEiMIFSUBWXBKX8	master
ff35c2dd-97bc-44b8-bc25-1d756be13fa7	Не 	назначен	t	2019-09-22 15:08:00.375673	\N	\N	\N	\N	\N	70100101101	nobody@nobody.z	$2b$08$rzo3wfsOiAe8JpxhhBzWU.59NVJ6PKu/U/ibFkeSxoge/2a07TvAi	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmZjM1YzJkZC05N2JjLTQ0YjgtYmMyNS0xZDc1NmJlMTNmYTciLCJpYXQiOjE1NjkxNDMyODAsImV4cCI6MTU2OTE0Njg4MH0.DBPs29I9qCjv8km3zv135vnzdQqc2Hr09AU695E_htA	nobody
3e732afb-002d-49cf-9364-6a8bcea92c8a	Forest	Gamp	t	2018-09-19 18:10:02.068	\N	\N	\N	\N	\N	71231231231	sgsgen@gmail.com	$2b$08$mvTsCcWOMFfC/4z2oHRUDOe6tjsPuNQrd3y.f5D/o3saTD8H9N.vC	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzZTczMmFmYi0wMDJkLTQ5Y2YtOTM2NC02YThiY2VhOTJjOGEiLCJpYXQiOjE1Njk0MTA0MjQsImV4cCI6MTU2OTQxNDAyNH0.GGxAPpaTW5rQXfb03lmsxRtUhfx6QKo8REslFx_TD5o	courier
f7d5b6bc-018e-46c5-9f5e-0857c0da7c42	James	Bond	t	2019-09-19 16:26:50.515385	\N	\N	\N	\N	\N	75555555555	sgsgen@gmail.com	$2b$08$g9KCNjEJ3P/F16j4wepXCeTzGNODBbSJnLR7tpwsLgY2hUUKlddya	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmN2Q1YjZiYy0wMThlLTQ2YzUtOWY1ZS0wODU3YzBkYTdjNDIiLCJpYXQiOjE1Njk1MDA0ODEsImV4cCI6MTU2OTUwNDA4MX0.wAxHauCUWZZBiUtUBmtRyUkVQMZn4Brqov7fWjgDVe8	master
8d6ced26-273f-4887-ac8c-39e8c563f8d4	Gena	Gareev	t	2019-09-11 18:40:59.22013	\N	\N	\N	\N	\N	77772894350	sgsgen@gmail.com	$2b$08$fOdSjRSuLsSklDImfviLH.rToT6cOvTtI/mab7U.OXYKM3QGZDNKi	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZDZjZWQyNi0yNzNmLTQ4ODctYWM4Yy0zOWU4YzU2M2Y4ZDQiLCJpYXQiOjE1Njk1ODczNDgsImV4cCI6MTU2OTU5MDk0OH0.gU-swn9gEmRjQ5Z51Gnz_19ScMD1DGZe6cPvNmO1Go4	admin
86891450-bf7a-4d9b-bc93-48080069bddd	Anthony	Stark	t	2019-09-22 22:24:24.987116	\N	\N	\N	\N	\N	71111111111	master@master.z	$2b$08$1K71bIZ/O61RAmKRb092TuvphvZRXv7KV7t4YF9hM35AcyfBy1vlC	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4Njg5MTQ1MC1iZjdhLTRkOWItYmM5My00ODA4MDA2OWJkZGQiLCJpYXQiOjE1Njk1OTA4NDcsImV4cCI6MTU2OTU5NDQ0N30.PI2eSU9JEvubddgWfXwsSshSMHcmtoMZsWVidDs82NM	master
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
