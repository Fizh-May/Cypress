export default function NotFoundPage() {
    return (
        <div className="page not-found-page" data-testid="not-found-page">
            <div className="not-found-content">
                <div className="not-found-code">404</div>
                <h1>Trang không tìm thấy</h1>
                <p>Trang bạn đang tìm kiếm không tồn tại.</p>
                <a href="/" className="btn btn-primary" data-testid="go-home-btn">
                    Về trang chủ
                </a>
            </div>
        </div>
    )
}
