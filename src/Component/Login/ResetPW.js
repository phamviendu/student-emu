import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

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
    display: "block",
    margin: "auto",
    width: "27vw",
    fontSize: "1.2vw",
    padding: "0.8vw",
    color: "#686d70"
}

const input = {
    display: "block",
    margin: "auto",
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
    margin: "1.5vw auto",
    // padding:"10px",
    display: "block",
    color: "#fff",
    borderRadius: "0.8vw",
    border: "none",
    fontSize: "1.3vw"
}

export default function Reset() {

    const [pw, setPw] = useState(null)
    const [rptpw, setRptpw] = useState(null)

    const location = useLocation()
    const token = new URLSearchParams(location.search).get('token')

    const history = useHistory()

    const resetPassword_API = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("tokenreset", token);
        urlencoded.append("passwordreset", pw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/account/resetpassword", requestOptions)
            .then(response => {

                if (response.ok)
                    return response
                throw Error("???? x???y ra l???i,vui l??ng th??? l???i")
            })
            .then(result => history.push("/"))
            .catch(error => { console.log('error', error) });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (pw !== rptpw) {
            alert('Nh???p l???i m???t kh???u kh??ng ch??nh x??c');
            return false;
        }
        resetPassword_API()
    }

    return <div style={background}>
        <form onSubmit={handleSubmit}>
            <div style={header}>Kh??i ph???c m???t kh???u</div>
            <div style={body}>
                <div style={text}>Nh???p m???t kh???u m???i</div>
                <input style={input} type="password" required onChange={(event) => setPw(event.target.value)} />
                <div style={text}>Nh???p l???i m???t kh???u m???i</div>
                <input style={input} type="password" required onChange={(event) => setRptpw(event.target.value)} />
                <input type="submit" style={button} value="X??c nh???n"/>
            </div>
        </form>
    </div>
}