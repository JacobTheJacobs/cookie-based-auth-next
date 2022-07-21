import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";

const Register = () => {
    const [name, setName] = useState("mama");
    const [email, setEmail] = useState("mama@gmail.com");
    const [password, setPassword] = useState("rrrrrr");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.table({ name, email, password });
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/register`,
                {
                    name,
                    email,
                    password,
                }
            );
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
            <h1 className="jumbotron text-center bg-primary square">הרשמה</h1>
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
                                {loading ? <SyncOutlined spin /> : "הירשמו"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
