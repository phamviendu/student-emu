import React, { Component } from 'react';
import '../../style/Signup.css';
import { Link } from 'react-router-dom';


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email: "",
            password: "",
            pwrepeat: "",
            uniselected: "",
            facselected:"",
            university: [], 
            faculty: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/university/getname", requestOptions)
            .then(response => response.json())
            .then(result => {
                var uni = result.map((value, index) => {
                    return <option key={index} value={value.MaTruong}>{value.TenTruongDH}</option>;
                })
                console.log(uni)
                this.setState({ university: uni })
            })
            .catch(error => console.log('error', error));
    }


    checkPasswordRepeat = () => {
        if (this.state.password === this.state.pwrepeat) {
            this.SignUpAccount();
        }
        else {
            alert("Nhập lại mật khẩu sai")
        }
    }


    async handleChange(event) {
        await this.setState({ [event.target.name]: event.target.value });
        // console.log(this.state.uniselected)
        this.loadingFaculty();
    }

    loadingFaculty = () => {
        // console.log(this.state.uniselected)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("MaTruong", this.state.uniselected);
        // console.log(this.state.uniselected)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/faculty/getname", requestOptions)
            .then(response => response.json())
            .then(result => {
                var fa = result.map((value, index) => {
                    return <option key={index} value={value.MaKhoa}>{value.TenKhoa}</option>;
                })
                // console.log(fa)
                this.setState({ faculty: fa })
            })
            .catch(error => console.log('error', error));
    }

    SignUpAccount = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", this.state.email);
        urlencoded.append("password", this.state.password);
        urlencoded.append("HoTen", this.state.name);
        urlencoded.append("MaTruong", this.state.uniselected);
        urlencoded.append("MaKhoa", this.state.facselected);
        // console.log(this.state.email)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/account/signup", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message === "account created") {
                    alert("Tạo thành công")
                }
            })
            .catch(error => {
                console.log('error', error);
                return false;
            });
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        // console.log(this.state.university.length === 0)
        if (this.state.university.length === 0) {
            // console.log(this.state.university.length === 0)
            return <></>
        }
        return (
            <div className="signup-box">
                <form>
                    <div className="container">
                        <h1>Đăng kí</h1>
                        <hr />
                        <label htmlFor="email"><b>Nhập Email</b></label>
                        <input type="text" placeholder="Nhập tên đăng nhập" name="email" onChange={this.setParams} required />
                        <label htmlFor="psw"><b>Mật khẩu</b></label>
                        <input type="password" placeholder="Nhập mật khẩu" name="password" onChange={this.setParams} required />
                        <label htmlFor="psw-repeat"><b>Nhập lại mật khẩu</b></label>
                        <input type="password" placeholder="Nhập lại mật khẩu" name="pwrepeat" onChange={this.setParams} required />
                        <label htmlFor="email"><b>Nhập tên</b></label>
                        <input type="text" placeholder="Nhập tên" name="name" onChange={this.setParams} />
                        <label htmlFor="university"><b>Chọn trường</b></label>
                        <select className="form-control" name="uniselected" onChange={this.handleChange} value={this.state.uniselected}>
                            <option>Chọn trường</option>
                            {this.state.university}
                        </select>
                        <label htmlFor="faculty" style={{ paddingTop: "30px" }}><b>Chọn khoa</b></label>
                        <select className="form-control" name="facselected" onChange={this.handleChange} value={this.state.facselected}>
                            <option>Chọn khoa</option>
                            {this.state.faculty}
                        </select>
                        <hr />
                        <p>Bằng cách nhấp vào Đăng ký, bạn đồng ý với  <a href="/#" style={{ color: 'dodgerblue' }}>Điều khoản &amp; Chính sách</a> của chúng tôi.</p>
                        <div className="clearfix">
                            <button type="button" className="signupbtn" onClick={() => this.checkPasswordRepeat()}>Đăng Kí</button>
                            <Link to="/" type="button" className="cancelbtn">Trở về</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Signup;