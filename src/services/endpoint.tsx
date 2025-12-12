import axios from "axios";

const Endpoint = axios.create({
    baseURL: "https://demo18.jidokasystem.co.id/ess/v1",
});

export default Endpoint;
