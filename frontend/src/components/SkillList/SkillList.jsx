import React from 'react'
import './SkillList.css'
import SkillRow from '../SkillRow/SkillRow'
import { frontendLogo, backendLogo, toolsLogo } from '../../assets/assets'


//SkillList displays all skill categories using SkillRow.

const SkillList = () => (
  <>
  <h1 className='skills-heading'>Skills:</h1>
  <div className='all-skills'>
    <SkillRow title='Frontend' skills={frontendLogo} />
    <SkillRow title='Backend + Database' skills={backendLogo} />
    <SkillRow title='Tools' skills={toolsLogo} />
  </div>
  </>
)

export default SkillList
