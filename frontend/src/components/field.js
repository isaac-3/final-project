datetime
max_temp * 9 / 5 + 32
min_temp

.weather.description
wind_cdir
wind_cdir_full
wind_dir

Few clouds


reviews
summmary ,author

props.review.published_date ? props.review.published_date.substring(0,10) : props.review.created_at.substring(0,10)

props.review.summary ? props.review.summary : props.review.review

// props.review.author ? props.review.author : props.review.user.username

// props.review.user ? props.review.user.pic_url : "https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png"