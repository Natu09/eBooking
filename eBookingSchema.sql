--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 12.0

-- Started on 2019-12-06 13:52:09 MST

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
-- TOC entry 3911 (class 1262 OID 16401)
-- Name: ebooking_DB; Type: DATABASE; Schema: -; Owner: cpsc_471
--

CREATE DATABASE "ebooking_DB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE "ebooking_DB" OWNER TO cpsc_471;

\connect "ebooking_DB"

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
-- TOC entry 635 (class 1247 OID 16676)
-- Name: Appointment_status; Type: TYPE; Schema: public; Owner: cpsc_471
--

CREATE TYPE public."Appointment_status" AS ENUM (
    'Confirmed',
    'Pending',
    'Cancelled'
);


ALTER TYPE public."Appointment_status" OWNER TO cpsc_471;

--
-- TOC entry 632 (class 1247 OID 16670)
-- Name: Appointment_type; Type: TYPE; Schema: public; Owner: cpsc_471
--

CREATE TYPE public."Appointment_type" AS ENUM (
    'Walk-in',
    'Appointment'
);


ALTER TYPE public."Appointment_type" OWNER TO cpsc_471;

SET default_tablespace = '';

--
-- TOC entry 208 (class 1259 OID 16687)
-- Name: appointment; Type: TABLE; Schema: public; Owner: cpsc_471
--

CREATE TABLE public.appointment (
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL,
    reason character varying,
    type public."Appointment_type",
    status public."Appointment_status",
    doctor_id integer NOT NULL,
    patient_id integer NOT NULL,
    room_id integer
);


ALTER TABLE public.appointment OWNER TO cpsc_471;

--
-- TOC entry 206 (class 1259 OID 16683)
-- Name: Appointment_doctor_id_seq; Type: SEQUENCE; Schema: public; Owner: cpsc_471
--

CREATE SEQUENCE public."Appointment_doctor_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Appointment_doctor_id_seq" OWNER TO cpsc_471;

--
-- TOC entry 3913 (class 0 OID 0)
-- Dependencies: 206
-- Name: Appointment_doctor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cpsc_471
--

ALTER SEQUENCE public."Appointment_doctor_id_seq" OWNED BY public.appointment.doctor_id;


--
-- TOC entry 207 (class 1259 OID 16685)
-- Name: Appointment_patient_id_seq; Type: SEQUENCE; Schema: public; Owner: cpsc_471
--

CREATE SEQUENCE public."Appointment_patient_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Appointment_patient_id_seq" OWNER TO cpsc_471;

--
-- TOC entry 3914 (class 0 OID 0)
-- Dependencies: 207
-- Name: Appointment_patient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cpsc_471
--

ALTER SEQUENCE public."Appointment_patient_id_seq" OWNED BY public.appointment.patient_id;


--
-- TOC entry 197 (class 1259 OID 16527)
-- Name: admin; Type: TABLE; Schema: public; Owner: cpsc_471
--

CREATE TABLE public.admin (
    userid integer NOT NULL,
    username character varying(225) NOT NULL,
    password character varying(225) NOT NULL
);


ALTER TABLE public.admin OWNER TO cpsc_471;

--
-- TOC entry 196 (class 1259 OID 16525)
-- Name: admin_userid_seq; Type: SEQUENCE; Schema: public; Owner: cpsc_471
--

CREATE SEQUENCE public.admin_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_userid_seq OWNER TO cpsc_471;

--
-- TOC entry 3915 (class 0 OID 0)
-- Dependencies: 196
-- Name: admin_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cpsc_471
--

ALTER SEQUENCE public.admin_userid_seq OWNED BY public.admin.userid;


--
-- TOC entry 205 (class 1259 OID 16612)
-- Name: availabilities; Type: TABLE; Schema: public; Owner: cpsc_471
--

CREATE TABLE public.availabilities (
    userid integer NOT NULL,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL
);


ALTER TABLE public.availabilities OWNER TO cpsc_471;

--
-- TOC entry 210 (class 1259 OID 16732)
-- Name: clinic; Type: TABLE; Schema: public; Owner: cpsc_471
--

CREATE TABLE public.clinic (
    street character varying NOT NULL,
    name character varying NOT NULL,
    clinic_id integer NOT NULL,
    city character varying NOT NULL,
    province character varying(3) NOT NULL,
    zip character varying(7) NOT NULL
);


ALTER TABLE public.clinic OWNER TO cpsc_471;

--
-- TOC entry 209 (class 1259 OID 16730)
-- Name: clinic_clinic_id_seq; Type: SEQUENCE; Schema: public; Owner: cpsc_471
--

CREATE SEQUENCE public.clinic_clinic_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clinic_clinic_id_seq OWNER TO cpsc_471;

--
-- TOC entry 3916 (class 0 OID 0)
-- Dependencies: 209
-- Name: clinic_clinic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cpsc_471
--

ALTER SEQUENCE public.clinic_clinic_id_seq OWNED BY public.clinic.clinic_id;


--
-- TOC entry 200 (class 1259 OID 16551)
-- Name: doctor; Type: TABLE; Schema: public; Owner: cpsc_471
--

CREATE TABLE public.doctor (
    userid integer NOT NULL,
    clinic_id integer NOT NULL
);


ALTER TABLE public.doctor OWNER TO cpsc_471;

--
-- TOC entry 201 (class 1259 OID 16559)
-- Name: nurse_staff; Type: TABLE; Schema: public; Owner: cpsc_471
--

CREATE TABLE public.nurse_staff (
    userid integer NOT NULL
);


ALTER TABLE public.nurse_staff OWNER TO cpsc_471;

--
-- TOC entry 202 (class 1259 OID 16567)
-- Name: patient; Type: TABLE; Schema: public; Owner: cpsc_471
--

CREATE TABLE public.patient (
    userid integer NOT NULL
);


ALTER TABLE public.patient OWNER TO cpsc_471;

--
-- TOC entry 203 (class 1259 OID 16577)
-- Name: phone_num; Type: TABLE; Schema: public; Owner: cpsc_471
--

CREATE TABLE public.phone_num (
    userid integer NOT NULL,
    phone_number bigint NOT NULL
);


ALTER TABLE public.phone_num OWNER TO cpsc_471;

--
-- TOC entry 204 (class 1259 OID 16600)
-- Name: records; Type: TABLE; Schema: public; Owner: cpsc_471
--

CREATE TABLE public.records (
    p_userid integer NOT NULL,
    num_noshow integer DEFAULT 0,
    num_cacellations integer DEFAULT 0
);


ALTER TABLE public.records OWNER TO cpsc_471;

--
-- TOC entry 212 (class 1259 OID 16757)
-- Name: room; Type: TABLE; Schema: public; Owner: cpsc_471
--

CREATE TABLE public.room (
    room_number integer NOT NULL,
    clinic_id integer NOT NULL
);


ALTER TABLE public.room OWNER TO cpsc_471;

--
-- TOC entry 211 (class 1259 OID 16755)
-- Name: room_room_number_seq; Type: SEQUENCE; Schema: public; Owner: cpsc_471
--

CREATE SEQUENCE public.room_room_number_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_room_number_seq OWNER TO cpsc_471;

--
-- TOC entry 3917 (class 0 OID 0)
-- Dependencies: 211
-- Name: room_room_number_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cpsc_471
--

ALTER SEQUENCE public.room_room_number_seq OWNED BY public.room.room_number;


--
-- TOC entry 199 (class 1259 OID 16535)
-- Name: users; Type: TABLE; Schema: public; Owner: cpsc_471
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    health_care character varying(225),
    password character varying(225) NOT NULL,
    email character varying(320) NOT NULL,
    dob date,
    fname character varying(225),
    lname character varying(225),
    admin_id integer
);


ALTER TABLE public.users OWNER TO cpsc_471;

--
-- TOC entry 198 (class 1259 OID 16533)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: cpsc_471
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO cpsc_471;

--
-- TOC entry 3918 (class 0 OID 0)
-- Dependencies: 198
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cpsc_471
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- TOC entry 3739 (class 2604 OID 16530)
-- Name: admin userid; Type: DEFAULT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.admin ALTER COLUMN userid SET DEFAULT nextval('public.admin_userid_seq'::regclass);


--
-- TOC entry 3743 (class 2604 OID 16690)
-- Name: appointment doctor_id; Type: DEFAULT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.appointment ALTER COLUMN doctor_id SET DEFAULT nextval('public."Appointment_doctor_id_seq"'::regclass);


--
-- TOC entry 3744 (class 2604 OID 16691)
-- Name: appointment patient_id; Type: DEFAULT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.appointment ALTER COLUMN patient_id SET DEFAULT nextval('public."Appointment_patient_id_seq"'::regclass);


--
-- TOC entry 3745 (class 2604 OID 16735)
-- Name: clinic clinic_id; Type: DEFAULT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.clinic ALTER COLUMN clinic_id SET DEFAULT nextval('public.clinic_clinic_id_seq'::regclass);


--
-- TOC entry 3746 (class 2604 OID 16760)
-- Name: room room_number; Type: DEFAULT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.room ALTER COLUMN room_number SET DEFAULT nextval('public.room_room_number_seq'::regclass);


--
-- TOC entry 3740 (class 2604 OID 16538)
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- TOC entry 3766 (class 2606 OID 16696)
-- Name: appointment Appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY (start_time, end_time, doctor_id, patient_id);


--
-- TOC entry 3748 (class 2606 OID 16532)
-- Name: admin admin_id_pk; Type: CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_id_pk PRIMARY KEY (userid);


--
-- TOC entry 3764 (class 2606 OID 16711)
-- Name: availabilities availabilities_pkey; Type: CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.availabilities
    ADD CONSTRAINT availabilities_pkey PRIMARY KEY (userid, start_time, end_time);


--
-- TOC entry 3768 (class 2606 OID 16740)
-- Name: clinic clinic_pkey; Type: CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.clinic
    ADD CONSTRAINT clinic_pkey PRIMARY KEY (clinic_id);


--
-- TOC entry 3762 (class 2606 OID 16606)
-- Name: records p_user_id_pk; Type: CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.records
    ADD CONSTRAINT p_user_id_pk PRIMARY KEY (p_userid);


--
-- TOC entry 3754 (class 2606 OID 16595)
-- Name: doctor pk_doctor; Type: CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT pk_doctor PRIMARY KEY (userid);


--
-- TOC entry 3756 (class 2606 OID 16597)
-- Name: nurse_staff pk_nurse_staff; Type: CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.nurse_staff
    ADD CONSTRAINT pk_nurse_staff PRIMARY KEY (userid);


--
-- TOC entry 3758 (class 2606 OID 16599)
-- Name: patient pk_patient; Type: CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT pk_patient PRIMARY KEY (userid);


--
-- TOC entry 3770 (class 2606 OID 16762)
-- Name: room room_pkey; Type: CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (room_number, clinic_id);


--
-- TOC entry 3750 (class 2606 OID 16545)
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- TOC entry 3772 (class 2606 OID 16769)
-- Name: room unique_room_id; Type: CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT unique_room_id UNIQUE (room_number);


--
-- TOC entry 3752 (class 2606 OID 16543)
-- Name: users user_id_pk; Type: CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_id_pk PRIMARY KEY (userid);


--
-- TOC entry 3760 (class 2606 OID 16581)
-- Name: phone_num userid_pnum_pk; Type: CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.phone_num
    ADD CONSTRAINT userid_pnum_pk PRIMARY KEY (userid, phone_number);


--
-- TOC entry 3784 (class 2606 OID 16763)
-- Name: room clinic; Type: FK CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT clinic FOREIGN KEY (clinic_id) REFERENCES public.clinic(clinic_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3774 (class 2606 OID 16775)
-- Name: doctor clinic_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT clinic_id_fk FOREIGN KEY (clinic_id) REFERENCES public.clinic(clinic_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- TOC entry 3782 (class 2606 OID 16722)
-- Name: appointment doctor; Type: FK CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT doctor FOREIGN KEY (doctor_id) REFERENCES public.doctor(userid) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3773 (class 2606 OID 16546)
-- Name: users need_admin; Type: FK CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT need_admin FOREIGN KEY (admin_id) REFERENCES public.admin(userid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3779 (class 2606 OID 16607)
-- Name: records p_userid_recordfk; Type: FK CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.records
    ADD CONSTRAINT p_userid_recordfk FOREIGN KEY (p_userid) REFERENCES public.patient(userid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3781 (class 2606 OID 16717)
-- Name: appointment patient; Type: FK CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT patient FOREIGN KEY (patient_id) REFERENCES public.users(userid) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3783 (class 2606 OID 16770)
-- Name: appointment room; Type: FK CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT room FOREIGN KEY (room_id) REFERENCES public.room(room_number) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3780 (class 2606 OID 16712)
-- Name: availabilities userID; Type: FK CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.availabilities
    ADD CONSTRAINT "userID" FOREIGN KEY (userid) REFERENCES public.doctor(userid) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3776 (class 2606 OID 16562)
-- Name: nurse_staff user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.nurse_staff
    ADD CONSTRAINT user_id_fk FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- TOC entry 3778 (class 2606 OID 16582)
-- Name: phone_num userid; Type: FK CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.phone_num
    ADD CONSTRAINT userid FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- TOC entry 3775 (class 2606 OID 16795)
-- Name: doctor userid-to-doc; Type: FK CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "userid-to-doc" FOREIGN KEY (userid) REFERENCES public.users(userid) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3777 (class 2606 OID 16790)
-- Name: patient userid-to-patient; Type: FK CONSTRAINT; Schema: public; Owner: cpsc_471
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "userid-to-patient" FOREIGN KEY (userid) REFERENCES public.users(userid) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3912 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: cpsc_471
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO cpsc_471;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2019-12-06 13:52:18 MST

--
-- PostgreSQL database dump complete
--

