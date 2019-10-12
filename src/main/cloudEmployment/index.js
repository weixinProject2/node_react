import React from 'react';
import { Route } from 'react-router-dom';

import './index.css'
import InterviewMange from './InterviewManagement';
import PositionInvite from './positionInvite';
import PractiveManagement from './practiceManagement';
import ProfessionalAbility from './professionalAbilityMooc';
import RecruitMenInfo from './recruitmentInfor';
import resumeManagement from './resumeManagement';

const CloudMan = (props)=>{
    const path = props.match.path;
    return (
        <div className="cloudMain">
            <Route path={`${path}/interviewMange`} component={InterviewMange}></Route>
            <Route path={`${path}/positionInvite`} component={PositionInvite}></Route>
            <Route path={`${path}/practiceManage`} component={PractiveManagement}></Route>
            <Route path={`${path}/professionalAblility`} component={ProfessionalAbility}></Route>
            <Route path={`${path}/recruitmentInfor`} component={RecruitMenInfo}></Route>
            <Route path={`${path}/resumeManagement`} component={resumeManagement}></Route>
        </div>
    )
}
export default CloudMan;