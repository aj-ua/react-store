export const updateLSWishlist = (data) => {
    let wishlist = []
    if (localStorage.getItem('wishlist')) {
        wishlist = JSON.parse(localStorage.getItem('wishlist'))
    }
}
