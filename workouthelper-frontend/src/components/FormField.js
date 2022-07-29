import React from 'react'
import { useField } from 'formik'
import Select from 'react-select'

import theme from '../theme'

const styles = {
  error: {
    color: theme.colors.errorRed,
  },
  textarea: {
    height: theme.heights.medium,
  },
}

export const Checkbox = ({ children, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <>
      <input type="checkbox" {...field} {...props} />
      {children}
      {meta.touched && meta.error ? (
        <div style={styles.error}>{meta.error}</div>
      ) : (
        null
      )}
    </>
  )
}

export const SelectValue = ({ label, ...props }) => {
  const [field, meta, { setValue, setTouched }] = useField(props)
  const options = props.children.map(o => ({
    value: o.props.value,
    label: o.props.children,
  }))

  const onChange = ({ value }) => {
    setValue(value)
  }

  return (
    <div className="mb-3">
      <label htmlFor={props.id || props.name} className="form-label">
        {label}
      </label>
      <Select
        defaultValue={options.find(o => o.value === field.value)}
        options={options}
        onChange={onChange}
        onBlur={setTouched}
      />
      {meta.touched && meta.error ? (
        <div style={styles.error}>{meta.error}</div>
      ) : (
        null
      )}
    </div>
  )
}

export const TextArea = ({ ...props }) => {
  const [field, meta] = useField(props)

  return (
    <>
      <textarea type="text" {...field} {...props} style={styles.textarea} />
      {meta.touched && meta.error ? (
        <div style={styles.error}>{meta.error}</div>
      ) : (
        null
      )}
    </>
  )
}

export const TextInput = ({ ...props }) => {
  const [field, meta] = useField(props)

  return (
    <>
      <input type="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div style={styles.error}>{meta.error}</div>
      ) : (
        null
      )}
    </>
  )
}