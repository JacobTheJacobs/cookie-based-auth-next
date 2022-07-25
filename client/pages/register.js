import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Register = () => {
    const [name, setName] = useState("Ryan");
    const [email, setEmail] = useState("ryan@gmail.com");
    const [password, setPassword] = useState("rrrrrr");
    const [loading, setLoading] = useState(false);

    const {
        state: { user },
        dispatch,
    } = useContext(Context);

    const router = useRouter();

    useEffect(() => {
        if (user !== null) router.push("/");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.table({ name, email, password });
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/register`, {
                name,
                email,
                password,
            });
            // console.log("REGISTER RESPONSE", data);
            toast("Registration successful. Please login.");
            setLoading(false);
        } catch (err) {
            toast(err.response.data);
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">הירשמו</h1>
            <div className="center">
                <div className="container  col-md-4 offset-md-4 pb-5">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control mb-4 p-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="הכנס שם"
                            required
                        />

                        <input
                            type="email"
                            className="form-control mb-4 p-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="הכנס מייל"
                            required
                        />

                        <input
                            type="password"
                            className="form-control mb-4 p-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="הכנס סיסמא"
                            required
                        />
                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-outline-warning"
                                disabled={
                                    !name || !email || !password || loading
                                }
                            >
                                {loading ? <SyncOutlined spin /> : "הרשמה"}
                            </button>
                        </div>
                    </form>
                </div>
                <p className="text-center p-3">
                    כבר רשומים?{" "}
                    <Link href="/login">
                        <a>כניסה</a>
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Register;
