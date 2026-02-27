export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="footer">
            <p className="footer-text">
                © {year} ShopTest · Built with ⚛️ React &amp; 🌲 Cypress
            </p>
        </footer>
    )
}
