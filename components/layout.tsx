const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen">
      {children}
      <footer>Built by Plai's laziness</footer>
    </div>
  )
}

export default Layout;