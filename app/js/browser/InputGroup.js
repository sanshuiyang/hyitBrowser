/*
 * Minio Cloud Storage (C) 2016, 2018 Minio, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react"

let InputGroup = ({
  label,
  id,
  name,
  value,
  onChange,
  type,
  spellCheck,
  required,
  readonly,
  autoComplete,
  align,
  className,
  placeholder,
  backgroundColor,
}) => {
  var input = (
    <input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="ig-text"
      type={type}
      spellCheck={spellCheck}
      required={required}
      autoComplete={autoComplete}
      placeholder={placeholder}
    />
  )
  if (readonly)
    input = (
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="ig-text"
        type={type}
        spellCheck={spellCheck}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled
      />
    )
  return (
    <div className={"input-group " + align + " " + className}>
      {input}
      <i className="ig-helpers" style={{ backgroundColor: `${backgroundColor}` }} />
      <label className="ig-label">{label}</label>
    </div>
  )
}

export default InputGroup
