function IconButton({ className = '', ...props }) {
  return <button type="button" className={`icon-btn ${className}`.trim()} {...props} />
}

export default IconButton
