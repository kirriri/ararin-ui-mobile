import React, {
    FC
} from 'react'
import classNames from 'classnames'

/**
 * Input可适应多种类型校验
 */

 type InputType = 'inpit' | 'block'

 type InputJudge = 'default'| 'mobilePhone'| 'adsl'| 'telePhone'| 'pwd'| 'allIdCard'| 'name'| 'code'| 'idCard'

 interface InputBaseProps {
     className?: string,
     type?: InputType,
     judge?: InputJudge
 }