const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen p-8">
      {children}
      <footer className="footer footer-center p-4 text-base-content">Built by Plai's laziness</footer>
    </div>
  )
}

export default Layout;