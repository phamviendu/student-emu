import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import "../../../../../style/Forum.css";
import Category from '../../Category';
import Forum from './Forum';
import PostForum from './PostForum';


function ViewForums() {
    let history = useHistory();

    const [forums, setForums] = useState(null);
    const [uni, setUni] = useState(null)
    const [fac, setFac] = useState(null)
    const [course, setCourse] = useState(null)
    const [loadingC, setLoadingC] = useState(1);
    const [loadingMoodleC, setLoadingMoodleC] = useState(1);
    const [loadingUF, setLoadingUF] = useState(1);
    const [page, setPage] = useState(0)
    const [allcourse, setAllcourse] = useState([])

    const email = useSelector(state => state.authen.email)
    const [tag, setTag] = useState("0")



    useEffect(() => {
        viewFacUniForums()
        viewCourseForums()

    }, [])

    useEffect(() => {
        getAllCourse()
    }, [page])

    const getAllCourse = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("page", page);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/studycourses/allcourses", requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json()
                throw new Error('Đã hết môn học');
            })
            .then(result => {
                console.log(result)
                // let temp=this.state.allcourse;
                // temp.push(result)
                // console.log("temp:",temp)
                let temp = allcourse;
                Array.prototype.push.apply(temp, result)
                setAllcourse(temp)
                setLoadingMoodleC(0)
            })
            .then(() => setPage(page + 1))
            .catch(error => console.log('error', error));
    }

    const viewFacUniForums = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") + "sT");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/forum/view", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                var clean = result
                // var clean = result.filter((result, index, self) =>
                //     index === self.findIndex((t) => (t.ID === result.ID)))
                setForums(clean)
                setLoadingUF(0)
                setUni(clean.filter(function (item) {
                    return item.scope == "u";
                }))
                setFac(clean.filter(function (item) {
                    return item.scope == "f";
                }))
            })
            .catch(error => console.log('error', error));
    }

    const viewCourseForums = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") + "sT");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/forum/courses/view", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCourse(result)
                setLoadingC(0)
            })
            .catch(error => console.log('error', error));
    }


    const convertTimeAgo = (UNIX_timestamp) => {
        // var a = new Date(UNIX_timestamp);
        // var time = a.getHours() + ":" + a.getMinutes();
        // return time;
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = Date.now() - UNIX_timestamp;

        if (elapsed < msPerMinute) {
            return '1 phút trước';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' phút trước';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' giờ trước';
        }

        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' ngày trước';
        }

        else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' tháng trước';
        }

        else {
            return Math.round(elapsed / msPerYear) + ' năm trước';
        }
    }

    const Delete_API = (removeid) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", removeid);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const items = [...forums];
        const temp = [...forums];
        const j = items.findIndex(item => item.ID === removeid);

        items.splice([j], 1);

        // rm company node if it have no items

        setForums(items)

        var url
        if (tag === "0")
            url = 'https://hcmusemu.herokuapp.com/forum/courses/delete'
        else url = 'https://hcmusemu.herokuapp.com/forum/delete'
        fetch(url, requestOptions)
            .then(response => {
                if (response.ok)
                    return response.text()
                throw Error("Đã xảy ra lỗi khi xóa bài viết")
            })
            .catch(error => setForums(temp));
    }


    const renderTag = () => {

        var showforums = null;
        if (tag === "0" && loadingC === 0)
            showforums = course;
        else if (loadingUF === 0 && tag !== "1") {
            if (tag === "2")
                showforums = fac;
            else showforums = uni;
        }
        if (showforums === null && (tag !== "1" || loadingMoodleC === 1))
            return null;
        return <div>
            {tag !== "1" &&
                showforums.map((forum) => {

                    return <div class="row justify-content-center" >
                        <div className="col-md-6 list-forums">
                            <div className="card border-0">

                                <div >
                                    <div class="card-body" style={{ padding: "0.75rem" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <div className="card-text">
                                                <img width="40px" height="40px" src={forum.AvartaOwn} style={{ borderRadius: "40px", border: "1px solid #dfdfdf" }} />
                                            </div>
                                            <div style={{ paddingLeft: "10px" }}>

                                                <div className="own" style={{ display: "inline-block" }}>{forum.NameOwn}</div>

                                                <div className="card-text" style={{ display: "inline-block" }}>
                                                    <small className="text-muted">
                                                        {/* <span className="time" style={{marginRight:"10px"}}>|</span> */}
                                                        <span className="time">{convertTimeAgo(forum.time)}</span>
                                                    </small>
                                                </div>
                                            </div>

                                        </div>

                                        <Link to={tag === "0" ? "/forum/courses/post/" + forum.ID : "/forum/post/" + forum.ID}>
                                            <h4 type="button" class="card-title title" >{forum.title}</h4>
                                        </Link>
                                        <hr style={{ margin: "0", padding: "0" }} />
                                        <div className="card-text interactive" style={{ paddingTop: "0.5rem" }}>

                                            <span>{forum.LikeByOwn === 0 ? <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="red" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                            </svg>} {forum.like} lượt thích </span>
                                            <span style={{ paddingLeft: "10px" }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 18">
                                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                            </svg> {forum.comment} bình luận</span>
                                        </div>
                                    </div>
                                </div>
                                {forum.image === "" ? null : <div className="card-header embed-responsive embed-responsive-4by3" style={{ borderBottom: "none" }}>
                                    <img class="card-img-top embed-responsive-item" style={{ objectFit: "cover", borderBottomLeftRadius: "7px", borderBottomRightRadius: "7px" }} src={forum.image}></img>
                                </div>}
                            </div>
                        </div>

                    </div>

                })
            }

            {tag === "1" &&
                allcourse.map((c, index) => {
                    return (
                        <div key={index} className="course">
                            <Link to={"/forum/courses/" + c.IDCourses} className="titlee direct">{c.name}</Link>
                            <div className="list-teacher">
                                {c.teacher.map((tc, tindex) => (
                                    <div key={tindex} className="content">
                                        <span>Giáo viên: </span>
                                        <span>{tc}</span>
                                    </div>))}
                            </div>
                        </div>
                    )
                })
            }
            {/* {this.LoaddingIcon()} */}
        </div>
    }

    if (loadingUF === 1 && loadingC === 1)
        return null;
    else {
        var assign = tag === "0" ? "assign" : "";
        var moodle = tag === "1" ? "assign" : "";
        var university = tag === "2" ? "university" : "";
        var faculty = tag === "3" ? "faculty" : "";
        return <div className="forum">
            <Category current="Diễn đàn" currentlink="/forum"/>
            <div className="deadline-tag">
                <div className="row tag">
                    <div type="button" className={"col-6 col-md-3 btn-deadline " + assign} onClick={() => setTag("0")} style={{ fontSize: "14px" }}> Tất cả khóa học
                    </div>
                    <div type="button" className={"col-6 col-md-3 btn-deadline " + moodle} onClick={() => setTag("1")}> Môn học
                    </div>
                    <div type="button" className={"col-6 col-md-3 btn-deadline " + university} onClick={() => setTag("2")}> Khoa
                    </div>
                    <div type="button" className={"col-6 col-md-3 btn-deadline " + faculty} onClick={() => setTag("3")}> Trường
                    </div>
                </div>
            </div>
            {/* <PostForum /> */}

            {renderTag()}
        </div>;
    }

    return null;
}



export default ViewForums;