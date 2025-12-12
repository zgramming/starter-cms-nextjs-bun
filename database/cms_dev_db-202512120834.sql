--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 17.0

-- Started on 2025-12-12 08:34:34

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE cms_dev_db;
--
-- TOC entry 3564 (class 1262 OID 1277881)
-- Name: cms_dev_db; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE cms_dev_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';


\connect cms_dev_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- TOC entry 2 (class 3079 OID 1277882)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3566 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 235 (class 1255 OID 1278184)
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 1278071)
-- Name: access_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.access_categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    category_id uuid NOT NULL,
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 224 (class 1259 OID 1278147)
-- Name: access_menu_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.access_menu_permissions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    access_menu_id uuid NOT NULL,
    permission_type_id uuid NOT NULL,
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 223 (class 1259 OID 1278126)
-- Name: access_menus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.access_menus (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    menu_id uuid NOT NULL,
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 221 (class 1259 OID 1278092)
-- Name: access_modules; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.access_modules (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    module_id uuid NOT NULL,
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 213 (class 1259 OID 1277945)
-- Name: application_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.application_categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    order_index integer DEFAULT 0 NOT NULL,
    route character varying(255),
    icon character varying(100),
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 215 (class 1259 OID 1277978)
-- Name: application_menus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.application_menus (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    category_id uuid NOT NULL,
    module_id uuid NOT NULL,
    parent_id uuid,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    order_index integer DEFAULT 0 NOT NULL,
    route character varying(255),
    icon character varying(100),
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 214 (class 1259 OID 1277959)
-- Name: application_modules; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.application_modules (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    category_id uuid NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    order_index integer DEFAULT 0 NOT NULL,
    route character varying(255),
    icon character varying(100),
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 216 (class 1259 OID 1278007)
-- Name: master_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.master_categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 217 (class 1259 OID 1278020)
-- Name: master_data; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.master_data (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    category_id uuid NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    order_index integer DEFAULT 0 NOT NULL,
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 218 (class 1259 OID 1278039)
-- Name: master_data_parameters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.master_data_parameters (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    master_data_id uuid NOT NULL,
    key character varying(100) NOT NULL,
    value text NOT NULL,
    description text,
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 219 (class 1259 OID 1278057)
-- Name: parameters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.parameters (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    value text NOT NULL,
    description text,
    data_type character varying(20) DEFAULT 'string'::character varying NOT NULL,
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 222 (class 1259 OID 1278113)
-- Name: permission_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.permission_types (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    code character varying(20) NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 212 (class 1259 OID 1277926)
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.refresh_tokens (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    token character varying(500) NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    is_revoked boolean DEFAULT false NOT NULL,
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 210 (class 1259 OID 1277893)
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 211 (class 1259 OID 1277906)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    full_name character varying(100),
    role_id uuid NOT NULL,
    last_login timestamp without time zone,
    status boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    updated_by uuid
);


--
-- TOC entry 3554 (class 0 OID 1278071)
-- Dependencies: 220
-- Data for Name: access_categories; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3558 (class 0 OID 1278147)
-- Dependencies: 224
-- Data for Name: access_menu_permissions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3557 (class 0 OID 1278126)
-- Dependencies: 223
-- Data for Name: access_menus; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3555 (class 0 OID 1278092)
-- Dependencies: 221
-- Data for Name: access_modules; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3547 (class 0 OID 1277945)
-- Dependencies: 213
-- Data for Name: application_categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.application_categories VALUES ('c1111111-1111-1111-1111-111111111111', 'DASHBOARD', 'Dashboard', 'Dashboard and analytics', 1, '/dashboard', 'dashboard', true, '2025-12-11 14:51:51.398376', '2025-12-11 14:51:51.398376', NULL, NULL);
INSERT INTO public.application_categories VALUES ('c2222222-2222-2222-2222-222222222222', 'USER_MANAGEMENT', 'User Management', 'User and role management', 2, '/user-management', 'users', true, '2025-12-11 14:51:51.398376', '2025-12-11 14:51:51.398376', NULL, NULL);
INSERT INTO public.application_categories VALUES ('c3333333-3333-3333-3333-333333333333', 'APPLICATION', 'Application', 'Application structure management', 3, '/application', 'apps', true, '2025-12-11 14:51:51.398376', '2025-12-11 14:51:51.398376', NULL, NULL);
INSERT INTO public.application_categories VALUES ('c4444444-4444-4444-4444-444444444444', 'MASTER_DATA', 'Master Data', 'Master data management', 4, '/master-data', 'database', true, '2025-12-11 14:51:51.398376', '2025-12-11 14:51:51.398376', NULL, NULL);
INSERT INTO public.application_categories VALUES ('c5555555-5555-5555-5555-555555555555', 'SYSTEM', 'System', 'System configuration', 5, '/system', 'settings', true, '2025-12-11 14:51:51.398376', '2025-12-11 14:51:51.398376', NULL, NULL);


--
-- TOC entry 3549 (class 0 OID 1277978)
-- Dependencies: 215
-- Data for Name: application_menus; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3548 (class 0 OID 1277959)
-- Dependencies: 214
-- Data for Name: application_modules; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3550 (class 0 OID 1278007)
-- Dependencies: 216
-- Data for Name: master_categories; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3551 (class 0 OID 1278020)
-- Dependencies: 217
-- Data for Name: master_data; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3552 (class 0 OID 1278039)
-- Dependencies: 218
-- Data for Name: master_data_parameters; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3553 (class 0 OID 1278057)
-- Dependencies: 219
-- Data for Name: parameters; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.parameters VALUES ('fb1264b3-17d9-4913-b26d-4ee414ad22c0', 'JWT_SECRET_KEY', 'JWT Secret Key', 'your-super-secret-key-change-this', 'Secret key for JWT token generation', 'string', true, '2025-12-11 14:51:51.375741', '2025-12-11 14:51:51.375741', NULL, NULL);
INSERT INTO public.parameters VALUES ('52e45b0a-15f1-4417-a310-d939af85b7ad', 'JWT_EXPIRY_MINUTES', 'JWT Expiry Minutes', '30', 'Access token expiry time in minutes', 'int', true, '2025-12-11 14:51:51.375741', '2025-12-11 14:51:51.375741', NULL, NULL);
INSERT INTO public.parameters VALUES ('5207210a-6b4b-4fc8-913b-45684c765225', 'REFRESH_TOKEN_EXPIRY_DAYS', 'Refresh Token Expiry Days', '7', 'Refresh token expiry time in days', 'int', true, '2025-12-11 14:51:51.375741', '2025-12-11 14:51:51.375741', NULL, NULL);
INSERT INTO public.parameters VALUES ('795f8250-8b5c-441b-8cec-a438fedaadfb', 'PASSWORD_MIN_LENGTH', 'Password Minimum Length', '8', 'Minimum password length', 'int', true, '2025-12-11 14:51:51.375741', '2025-12-11 14:51:51.375741', NULL, NULL);
INSERT INTO public.parameters VALUES ('f081e2e8-e68e-4d02-bf93-ccc89062240a', 'MAX_LOGIN_ATTEMPTS', 'Maximum Login Attempts', '5', 'Maximum failed login attempts before lockout', 'int', true, '2025-12-11 14:51:51.375741', '2025-12-11 14:51:51.375741', NULL, NULL);
INSERT INTO public.parameters VALUES ('1da40edb-bccc-4e3e-b9eb-f8e768bb3abb', 'SYSTEM_EMAIL', 'System Email', 'noreply@cms.com', 'System email address', 'string', true, '2025-12-11 14:51:51.375741', '2025-12-11 14:51:51.375741', NULL, NULL);


--
-- TOC entry 3556 (class 0 OID 1278113)
-- Dependencies: 222
-- Data for Name: permission_types; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.permission_types VALUES ('a1111111-1111-1111-1111-111111111111', 'VIEW', 'View', 'Permission to view data', true, '2025-12-11 14:51:51.363842', '2025-12-11 14:51:51.363842', NULL, NULL);
INSERT INTO public.permission_types VALUES ('a2222222-2222-2222-2222-222222222222', 'ADD', 'Add', 'Permission to add new data', true, '2025-12-11 14:51:51.363842', '2025-12-11 14:51:51.363842', NULL, NULL);
INSERT INTO public.permission_types VALUES ('a3333333-3333-3333-3333-333333333333', 'EDIT', 'Edit', 'Permission to edit data', true, '2025-12-11 14:51:51.363842', '2025-12-11 14:51:51.363842', NULL, NULL);
INSERT INTO public.permission_types VALUES ('a4444444-4444-4444-4444-444444444444', 'DELETE', 'Delete', 'Permission to delete data', true, '2025-12-11 14:51:51.363842', '2025-12-11 14:51:51.363842', NULL, NULL);
INSERT INTO public.permission_types VALUES ('a5555555-5555-5555-5555-555555555555', 'PRINT', 'Print', 'Permission to print data', true, '2025-12-11 14:51:51.363842', '2025-12-11 14:51:51.363842', NULL, NULL);
INSERT INTO public.permission_types VALUES ('a6666666-6666-6666-6666-666666666666', 'APPROVE', 'Approve', 'Permission to approve data', true, '2025-12-11 14:51:51.363842', '2025-12-11 14:51:51.363842', NULL, NULL);
INSERT INTO public.permission_types VALUES ('a7777777-7777-7777-7777-777777777777', 'CANCEL', 'Cancel', 'Permission to cancel data', true, '2025-12-11 14:51:51.363842', '2025-12-11 14:51:51.363842', NULL, NULL);
INSERT INTO public.permission_types VALUES ('a8888888-8888-8888-8888-888888888888', 'IMPORT', 'Import', 'Permission to import data', true, '2025-12-11 14:51:51.363842', '2025-12-11 14:51:51.363842', NULL, NULL);
INSERT INTO public.permission_types VALUES ('a9999999-9999-9999-9999-999999999999', 'EXPORT', 'Export', 'Permission to export data', true, '2025-12-11 14:51:51.363842', '2025-12-11 14:51:51.363842', NULL, NULL);


--
-- TOC entry 3546 (class 0 OID 1277926)
-- Dependencies: 212
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3544 (class 0 OID 1277893)
-- Dependencies: 210
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.roles VALUES ('11111111-1111-1111-1111-111111111111', 'SUPERADMIN', 'Super Administrator', 'Full system access', true, '2025-12-11 14:51:51.354978', '2025-12-11 14:51:51.354978', NULL, NULL);
INSERT INTO public.roles VALUES ('22222222-2222-2222-2222-222222222222', 'ADMIN', 'Administrator', 'Administrative access', true, '2025-12-11 14:51:51.354978', '2025-12-11 14:51:51.354978', NULL, NULL);
INSERT INTO public.roles VALUES ('33333333-3333-3333-3333-333333333333', 'USER', 'User', 'Standard user access', true, '2025-12-11 14:51:51.354978', '2025-12-11 14:51:51.354978', NULL, NULL);


--
-- TOC entry 3545 (class 0 OID 1277906)
-- Dependencies: 211
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES ('00000000-0000-0000-0000-000000000001', 'superadmin', 'superadmin@cms.com', 'HASH_PASSWORD_HERE', 'Super Administrator', '11111111-1111-1111-1111-111111111111', NULL, true, '2025-12-11 14:51:51.367265', '2025-12-11 14:51:51.367265', NULL, NULL);


--
-- TOC entry 3351 (class 2606 OID 1278079)
-- Name: access_categories access_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_categories
    ADD CONSTRAINT access_categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3353 (class 2606 OID 1278081)
-- Name: access_categories access_categories_user_id_category_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_categories
    ADD CONSTRAINT access_categories_user_id_category_id_key UNIQUE (user_id, category_id);


--
-- TOC entry 3370 (class 2606 OID 1278157)
-- Name: access_menu_permissions access_menu_permissions_access_menu_id_permission_type_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_menu_permissions
    ADD CONSTRAINT access_menu_permissions_access_menu_id_permission_type_id_key UNIQUE (access_menu_id, permission_type_id);


--
-- TOC entry 3372 (class 2606 OID 1278155)
-- Name: access_menu_permissions access_menu_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_menu_permissions
    ADD CONSTRAINT access_menu_permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 3365 (class 2606 OID 1278134)
-- Name: access_menus access_menus_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_menus
    ADD CONSTRAINT access_menus_pkey PRIMARY KEY (id);


--
-- TOC entry 3367 (class 2606 OID 1278136)
-- Name: access_menus access_menus_user_id_menu_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_menus
    ADD CONSTRAINT access_menus_user_id_menu_id_key UNIQUE (user_id, menu_id);


--
-- TOC entry 3356 (class 2606 OID 1278100)
-- Name: access_modules access_modules_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_modules
    ADD CONSTRAINT access_modules_pkey PRIMARY KEY (id);


--
-- TOC entry 3358 (class 2606 OID 1278102)
-- Name: access_modules access_modules_user_id_module_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_modules
    ADD CONSTRAINT access_modules_user_id_module_id_key UNIQUE (user_id, module_id);


--
-- TOC entry 3317 (class 2606 OID 1277958)
-- Name: application_categories application_categories_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application_categories
    ADD CONSTRAINT application_categories_code_key UNIQUE (code);


--
-- TOC entry 3319 (class 2606 OID 1277956)
-- Name: application_categories application_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application_categories
    ADD CONSTRAINT application_categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3326 (class 2606 OID 1277991)
-- Name: application_menus application_menus_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application_menus
    ADD CONSTRAINT application_menus_code_key UNIQUE (code);


--
-- TOC entry 3328 (class 2606 OID 1277989)
-- Name: application_menus application_menus_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application_menus
    ADD CONSTRAINT application_menus_pkey PRIMARY KEY (id);


--
-- TOC entry 3321 (class 2606 OID 1277972)
-- Name: application_modules application_modules_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application_modules
    ADD CONSTRAINT application_modules_code_key UNIQUE (code);


--
-- TOC entry 3323 (class 2606 OID 1277970)
-- Name: application_modules application_modules_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application_modules
    ADD CONSTRAINT application_modules_pkey PRIMARY KEY (id);


--
-- TOC entry 3333 (class 2606 OID 1278019)
-- Name: master_categories master_categories_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.master_categories
    ADD CONSTRAINT master_categories_code_key UNIQUE (code);


--
-- TOC entry 3335 (class 2606 OID 1278017)
-- Name: master_categories master_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.master_categories
    ADD CONSTRAINT master_categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3338 (class 2606 OID 1278033)
-- Name: master_data master_data_category_id_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.master_data
    ADD CONSTRAINT master_data_category_id_code_key UNIQUE (category_id, code);


--
-- TOC entry 3343 (class 2606 OID 1278051)
-- Name: master_data_parameters master_data_parameters_master_data_id_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.master_data_parameters
    ADD CONSTRAINT master_data_parameters_master_data_id_key_key UNIQUE (master_data_id, key);


--
-- TOC entry 3345 (class 2606 OID 1278049)
-- Name: master_data_parameters master_data_parameters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.master_data_parameters
    ADD CONSTRAINT master_data_parameters_pkey PRIMARY KEY (id);


--
-- TOC entry 3340 (class 2606 OID 1278031)
-- Name: master_data master_data_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.master_data
    ADD CONSTRAINT master_data_pkey PRIMARY KEY (id);


--
-- TOC entry 3347 (class 2606 OID 1278070)
-- Name: parameters parameters_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.parameters
    ADD CONSTRAINT parameters_code_key UNIQUE (code);


--
-- TOC entry 3349 (class 2606 OID 1278068)
-- Name: parameters parameters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.parameters
    ADD CONSTRAINT parameters_pkey PRIMARY KEY (id);


--
-- TOC entry 3361 (class 2606 OID 1278125)
-- Name: permission_types permission_types_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permission_types
    ADD CONSTRAINT permission_types_code_key UNIQUE (code);


--
-- TOC entry 3363 (class 2606 OID 1278123)
-- Name: permission_types permission_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permission_types
    ADD CONSTRAINT permission_types_pkey PRIMARY KEY (id);


--
-- TOC entry 3313 (class 2606 OID 1277937)
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 3315 (class 2606 OID 1277939)
-- Name: refresh_tokens refresh_tokens_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_key UNIQUE (token);


--
-- TOC entry 3298 (class 2606 OID 1277905)
-- Name: roles roles_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_code_key UNIQUE (code);


--
-- TOC entry 3300 (class 2606 OID 1277903)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3305 (class 2606 OID 1277920)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3307 (class 2606 OID 1277916)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3309 (class 2606 OID 1277918)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3354 (class 1259 OID 1278179)
-- Name: idx_access_categories_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_access_categories_user_id ON public.access_categories USING btree (user_id);


--
-- TOC entry 3373 (class 1259 OID 1278182)
-- Name: idx_access_menu_permissions_access_menu_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_access_menu_permissions_access_menu_id ON public.access_menu_permissions USING btree (access_menu_id);


--
-- TOC entry 3368 (class 1259 OID 1278181)
-- Name: idx_access_menus_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_access_menus_user_id ON public.access_menus USING btree (user_id);


--
-- TOC entry 3359 (class 1259 OID 1278180)
-- Name: idx_access_modules_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_access_modules_user_id ON public.access_modules USING btree (user_id);


--
-- TOC entry 3329 (class 1259 OID 1278174)
-- Name: idx_application_menus_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_application_menus_category_id ON public.application_menus USING btree (category_id);


--
-- TOC entry 3330 (class 1259 OID 1278175)
-- Name: idx_application_menus_module_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_application_menus_module_id ON public.application_menus USING btree (module_id);


--
-- TOC entry 3331 (class 1259 OID 1278176)
-- Name: idx_application_menus_parent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_application_menus_parent_id ON public.application_menus USING btree (parent_id);


--
-- TOC entry 3324 (class 1259 OID 1278173)
-- Name: idx_application_modules_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_application_modules_category_id ON public.application_modules USING btree (category_id);


--
-- TOC entry 3336 (class 1259 OID 1278177)
-- Name: idx_master_data_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_master_data_category_id ON public.master_data USING btree (category_id);


--
-- TOC entry 3341 (class 1259 OID 1278178)
-- Name: idx_master_data_parameters_master_data_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_master_data_parameters_master_data_id ON public.master_data_parameters USING btree (master_data_id);


--
-- TOC entry 3310 (class 1259 OID 1278172)
-- Name: idx_refresh_tokens_token; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_refresh_tokens_token ON public.refresh_tokens USING btree (token);


--
-- TOC entry 3311 (class 1259 OID 1278171)
-- Name: idx_refresh_tokens_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_refresh_tokens_user_id ON public.refresh_tokens USING btree (user_id);


--
-- TOC entry 3301 (class 1259 OID 1278169)
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- TOC entry 3302 (class 1259 OID 1278170)
-- Name: idx_users_role_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_role_id ON public.users USING btree (role_id);


--
-- TOC entry 3303 (class 1259 OID 1278168)
-- Name: idx_users_username; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_username ON public.users USING btree (username);


--
-- TOC entry 3400 (class 2620 OID 1278195)
-- Name: access_categories update_access_categories_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_access_categories_updated_at BEFORE UPDATE ON public.access_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3404 (class 2620 OID 1278199)
-- Name: access_menu_permissions update_access_menu_permissions_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_access_menu_permissions_updated_at BEFORE UPDATE ON public.access_menu_permissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3403 (class 2620 OID 1278198)
-- Name: access_menus update_access_menus_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_access_menus_updated_at BEFORE UPDATE ON public.access_menus FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3401 (class 2620 OID 1278196)
-- Name: access_modules update_access_modules_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_access_modules_updated_at BEFORE UPDATE ON public.access_modules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3393 (class 2620 OID 1278188)
-- Name: application_categories update_application_categories_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_application_categories_updated_at BEFORE UPDATE ON public.application_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3395 (class 2620 OID 1278190)
-- Name: application_menus update_application_menus_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_application_menus_updated_at BEFORE UPDATE ON public.application_menus FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3394 (class 2620 OID 1278189)
-- Name: application_modules update_application_modules_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_application_modules_updated_at BEFORE UPDATE ON public.application_modules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3396 (class 2620 OID 1278191)
-- Name: master_categories update_master_categories_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_master_categories_updated_at BEFORE UPDATE ON public.master_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3398 (class 2620 OID 1278193)
-- Name: master_data_parameters update_master_data_parameters_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_master_data_parameters_updated_at BEFORE UPDATE ON public.master_data_parameters FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3397 (class 2620 OID 1278192)
-- Name: master_data update_master_data_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_master_data_updated_at BEFORE UPDATE ON public.master_data FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3399 (class 2620 OID 1278194)
-- Name: parameters update_parameters_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_parameters_updated_at BEFORE UPDATE ON public.parameters FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3402 (class 2620 OID 1278197)
-- Name: permission_types update_permission_types_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_permission_types_updated_at BEFORE UPDATE ON public.permission_types FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3392 (class 2620 OID 1278187)
-- Name: refresh_tokens update_refresh_tokens_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_refresh_tokens_updated_at BEFORE UPDATE ON public.refresh_tokens FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3390 (class 2620 OID 1278185)
-- Name: roles update_roles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON public.roles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3391 (class 2620 OID 1278186)
-- Name: users update_users_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3382 (class 2606 OID 1278087)
-- Name: access_categories access_categories_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_categories
    ADD CONSTRAINT access_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.application_categories(id) ON DELETE CASCADE;


--
-- TOC entry 3383 (class 2606 OID 1278082)
-- Name: access_categories access_categories_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_categories
    ADD CONSTRAINT access_categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3388 (class 2606 OID 1278158)
-- Name: access_menu_permissions access_menu_permissions_access_menu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_menu_permissions
    ADD CONSTRAINT access_menu_permissions_access_menu_id_fkey FOREIGN KEY (access_menu_id) REFERENCES public.access_menus(id) ON DELETE CASCADE;


--
-- TOC entry 3389 (class 2606 OID 1278163)
-- Name: access_menu_permissions access_menu_permissions_permission_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_menu_permissions
    ADD CONSTRAINT access_menu_permissions_permission_type_id_fkey FOREIGN KEY (permission_type_id) REFERENCES public.permission_types(id) ON DELETE CASCADE;


--
-- TOC entry 3386 (class 2606 OID 1278142)
-- Name: access_menus access_menus_menu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_menus
    ADD CONSTRAINT access_menus_menu_id_fkey FOREIGN KEY (menu_id) REFERENCES public.application_menus(id) ON DELETE CASCADE;


--
-- TOC entry 3387 (class 2606 OID 1278137)
-- Name: access_menus access_menus_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_menus
    ADD CONSTRAINT access_menus_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3384 (class 2606 OID 1278108)
-- Name: access_modules access_modules_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_modules
    ADD CONSTRAINT access_modules_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.application_modules(id) ON DELETE CASCADE;


--
-- TOC entry 3385 (class 2606 OID 1278103)
-- Name: access_modules access_modules_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access_modules
    ADD CONSTRAINT access_modules_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3377 (class 2606 OID 1277992)
-- Name: application_menus application_menus_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application_menus
    ADD CONSTRAINT application_menus_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.application_categories(id) ON DELETE CASCADE;


--
-- TOC entry 3378 (class 2606 OID 1277997)
-- Name: application_menus application_menus_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application_menus
    ADD CONSTRAINT application_menus_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.application_modules(id) ON DELETE CASCADE;


--
-- TOC entry 3379 (class 2606 OID 1278002)
-- Name: application_menus application_menus_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application_menus
    ADD CONSTRAINT application_menus_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.application_menus(id) ON DELETE CASCADE;


--
-- TOC entry 3376 (class 2606 OID 1277973)
-- Name: application_modules application_modules_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application_modules
    ADD CONSTRAINT application_modules_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.application_categories(id) ON DELETE CASCADE;


--
-- TOC entry 3380 (class 2606 OID 1278034)
-- Name: master_data master_data_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.master_data
    ADD CONSTRAINT master_data_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.master_categories(id) ON DELETE CASCADE;


--
-- TOC entry 3381 (class 2606 OID 1278052)
-- Name: master_data_parameters master_data_parameters_master_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.master_data_parameters
    ADD CONSTRAINT master_data_parameters_master_data_id_fkey FOREIGN KEY (master_data_id) REFERENCES public.master_data(id) ON DELETE CASCADE;


--
-- TOC entry 3375 (class 2606 OID 1277940)
-- Name: refresh_tokens refresh_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3374 (class 2606 OID 1277921)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- TOC entry 3565 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2025-12-12 08:34:35

--
-- PostgreSQL database dump complete
--

