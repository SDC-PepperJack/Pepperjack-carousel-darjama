--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 12.0

-- Started on 2019-11-08 11:33:57 PST

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
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: darylmarco
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO darylmarco;

--
-- TOC entry 3189 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: darylmarco
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

--
-- TOC entry 196 (class 1259 OID 16397)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    productid integer NOT NULL,
    productitem character varying(50) NOT NULL,
    pictureurl text[],
    likes boolean
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16438)
-- Name: wishlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wishlist (
    username text NOT NULL,
    products numeric[]
);


ALTER TABLE public.wishlist OWNER TO postgres;

--
-- TOC entry 3060 (class 2606 OID 16437)
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (productid);


--
-- TOC entry 3062 (class 2606 OID 16447)
-- Name: wishlist wishlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_pkey PRIMARY KEY (username);


-- Completed on 2019-11-08 11:33:57 PST

--
-- PostgreSQL database dump complete
--

