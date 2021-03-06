import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const background = {
    display: "block",
    position: "absolute",
    top: "25%",
    left: "50%",
    // marginTop: "-15vw",
    marginLeft: "-15vw",
    width: "30vw",
    // minWidth:"300px",
    // height: "30vw",
    // border: "1px solid black",
    background: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",

}

const header = {
    fontWeight: "600",
    fontSize: "2.5vw",
    marginTop: "4vw",
    textAlign: "center",
    color: "#434343"
}

const body = {
    padding: "0.8vw",
}

const text = {
    display:"block",
    margin:"auto",
    width:"27vw",
    fontSize: "1.2vw",
    padding: "0.8vw",
    color: "#686d70"
}

const input = {
    display: "block",
    margin: "2vw auto",
    padding: "0.7vw",
    width: "27vw",
    background: "#eeeeef",
    border: 'none',
    fontSize: "1.2vw",

}

const button = {
    background: "#3768a0",
    width: "20vw",
    height: "3vw",
    margin: "0.8vw auto",
    // padding:"10px",
    display: "block",
    color: "#fff",
    borderRadius: "0.8vw",
    border: "none",
    fontSize: "1.3vw"
}
const link = {
    // margin:"auto",
    // width:"17vw",
    // display:"block",
    // padding: "0 0 2vw 0",
    // fontSize: "1.3vw",
    textAlign:"center",
    background: "#3768a0",
    width: "20vw",
    // height: "3vw",
    margin: "1.5vw auto",
    padding:"0.3vw",
    display: "block",
    color: "#fff",
    borderRadius: "0.8vw",
    border: "none",
    fontSize: "1.3vw",
    textDecoration: 'none'
}
//test

export default function Forgot() {

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(0)

    const ForgetPW_API = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("emailApp", email);
        urlencoded.append("emailReset", email);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/account/forgotpassword", requestOptions)
            .then(response => response.text())
            .then(result => setSuccess(1))
            .catch(error => console.log('error', error));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            alert('?????a ch??? email: ' + email + ' kh??ng ch??nh x??c');
            return false;
        }
        ForgetPW_API()
    }

    const validateEmail = (inputemail) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(inputemail);
    }

    if (success === 0)
        return <div style={background}>
            <form onSubmit={handleSubmit}>
                <div style={header}>Qu??n m???t kh???u</div>
                <div style={body}>
                    <div style={text}>Vui l??ng nh???p email ???? ????ng k?? c???a b???n,li??n k???t kh??i ph???c m???t kh???u s??? ???????c g???i v??? ?????a ch??? email ???? ????ng k?? t??i kho???n</div>
                    <input style={input} placeholder="Email" required onChange={(event) => setEmail(event.target.value)} />
                    <input style={button} type="submit" value="G???i"></input>
                </div>
            </form>
        </div>
    else return <div style={background}>
        <div>
            <div style={header}>Th??nh c??ng</div>
            <div style={text}>N???u email c???a b???n ???? ???????c ????ng k??, b???n s??? nh???n ???????c email kh??i ph???c m???t kh???u trong v??i ph??t</div>
        </div>
        <Link style={link} to="/">Tr??? v??? trang ????ng nh???p</Link>
    </div>
}