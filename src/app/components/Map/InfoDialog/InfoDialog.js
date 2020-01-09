import React from 'react';
import style from './InfoDialog.module.css'

const InfoDialog=(props)=>{
    return(
        <div className={style.Body} onClick={props.click}>
            <div className={style.main1}>
                <p>Plate</p>
                <p>-</p>
            </div>
            <div className={style.main2}>
                <p className={style.subHeading}>Driver Info</p>
                <p>-</p>
            </div>
            <div className={style.main3}>
                <p className={style.subHeading}>Speed</p>
                <p>{props.speed}</p>
            </div>
            <div className={style.main4}>
                <p className={style.subHeading}>Date</p>
                <p>{String(new Date(props.date)).slice(0,25)}</p>
            </div>  
        </div>
    )
}

export default InfoDialog;