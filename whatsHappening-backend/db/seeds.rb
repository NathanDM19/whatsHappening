# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Happening.destroy_all
Category.destroy_all
Attendance.destroy_all

# User
u1 = User.create name: "Brendan", admin_flag: true, password: "chicken", password_confirmation: "chicken"
u2 = User.create name: "Nathan", admin_flag: true, password: "chicken", password_confirmation: "chicken"
u3 = User.create name: "Luke", admin_flag: false, password: "chicken", password_confirmation: "chicken"
u4 = User.create name: "Grant", admin_flag: false, password: "chicken", password_confirmation: "chicken"
u5 = User.create name: "Linna", admin_flag: false, password: "chicken", password_confirmation: "chicken"
puts "Created [#{ User.all.length }] Users"

# Happening
h1 = Happening.create name:"Rocks Markets",city:"Sydney",address:"George St, The Rocks",latitude:-33.8576978,longitude:151.2087702,happening_type:"Markets",description:"The Rocks Markets, where carefully curated artisanal wares, gourmet street food and harbourside views come together upon the cobblestone streets.",url:"https://www.therocks.com/things-to-do/the-rocks-markets/",when:"Every Saturday & Sunday",time:"10am - 4pm"

h2 = Happening.create name:"Sydney Harbour Bridge Climb",city:"Sydney", address:"3 Cumberland St, The Rocks",latitude:-33.8576978,longitude:151.2087702,happening_type:"Cultural",description:"Absorb a 360 degree panorama of Sydney as you journey to the summit up the top arch of the Sydney Harbour Bridge. Like an exposed spine, the outer rim delivers you to the peak, as the sky remains just beyond your outstretched fingertips.", url:"https://www.bridgeclimb.com/",when:"Multiple times at Dawn, during the Day, Night and Twilight",time:"Various options, between 1 1/2 hours to 3 1/2 hours"

h3 = Happening.create name:"Museum of Contemporary Art",city:"Sydney",address:"140 George Street, Circular Quay",latitude:-33.8576978,longitude:151.2087702,happening_type:"Museums",description:"Australia’s leading museum dedicated to exhibiting, collecting and interpreting the work of today’s artists. The MCA celebrates the work of living artists, bringing exceptional exhibitions of international and Australian art to as many people as possible – welcoming over a million visitors each year – in the belief that art is for everyone.",url:"https://www.mca.com.au/",when:"Daily",time:"10am - 5pm (open till 9pm on Wednesday, Friday and Saturday)"

h4 = Happening.create name:"The Rocks Discovery Museum",city:"Sydney",address:"Kendall Ln, The Rocks",latitude:-33.8587022,longitude:151.20861719999994,happening_type:"Museums",description:"The Rocks Discovery Museum is a free, family friendly museum which tells the story of The Rocks area of Sydney from pre-European days to the present. Housed in a restored 1850s sandstone warehouse, the museum is home to a unique collection of images and archaeological artefacts found in The Rocks – some of which you can even hold. The exhibits are filled with interactive fun, using touch screens, audio and visual elements to bring the history of the area alive.",url:"https://www.therocks.com/things-to-do/the-rocks-discovery-museum/",when:"Daily",time:"10am - 5pm"

h5 = Happening.create name:"Sydney Harbour Bridge",city:"Sydney",address:"100 Cumberland St, The Rocks",latitude:-33.8590847,longitude:151.20694520000006,happening_type:"Cultural",description:"You can walk across the bridge from either direction and it takes between 15-30 minutes depending on the pace you set. There is a safety fence all the way however you can poke your camera through the gaps and take shots like the one above.",url:"", when:"Never shuts", time:"Self-paced"

puts "Created [#{ Happening.all.length }] Happenings"

# Category
c1 = Category.create name:"Target Audience"
c2 = Category.create name:"Kids", parent_category_id:1
c3 = Category.create name:"Families", parent_category_id:1
c4 = Category.create name:"Singles", parent_category_id:1
c5 = Category.create name:"Young Adults", parent_category_id:1
c6 = Category.create name:"Adults", parent_category_id:1
c7 = Category.create name:"Cost"
c8 = Category.create name:"Free", parent_category_id:7
c9 = Category.create name:"Entrance Fee", parent_category_id:7
puts "Created [#{ Category.all.length }] Categories"

# H1 = Rocks Markets
h1.categories << c1
h1.categories << c3
h1.categories << c4
h1.categories << c5
h1.categories << c6
h1.categories << c7
h1.categories << c8

# # H2 = Bridge Climb
h2.categories << c1
h2.categories << c4
h2.categories << c5
h2.categories << c6
h2.categories << c7
h2.categories << c9

# H3 = Museum of Contempory Art
h3.categories << c1
h3.categories << c2
h3.categories << c3
h3.categories << c4
h3.categories << c5
h3.categories << c6
h3.categories << c7
h3.categories << c8

# H4 = Rocks Discovery Museum
h4.categories << c1
h4.categories << c2
h4.categories << c3
h4.categories << c4
h4.categories << c5
h4.categories << c6
h4.categories << c7
h4.categories << c8

# H5 = Bridge Walk
h5.categories << c1
h5.categories << c2
h5.categories << c3
h5.categories << c4
h5.categories << c5
h5.categories << c6
h5.categories << c7
h5.categories << c8

# Happenings Dates
d1 = HappeningDate.create happening_id:1,daily_flag:false,date:"2018/06/16",start_time:"10:00:00",end_time:"16:00:00"
d2 = HappeningDate.create happening_id:1,daily_flag:false,date:"2018/06/17",start_time:"10:00:00",end_time:"16:00:00"
d3 = HappeningDate.create happening_id:1,daily_flag:false,date:"2018/06/23",start_time:"10:00:00",end_time:"16:00:00"
d4 = HappeningDate.create happening_id:1,daily_flag:false,date:"2018/06/24",start_time:"10:00:00",end_time:"16:00:00"
d5 = HappeningDate.create happening_id:1,daily_flag:false,date:"2018/06/30",start_time:"10:00:00",end_time:"16:00:00"
d6 = HappeningDate.create happening_id:1,daily_flag:false,date:"2018/07/01",start_time:"10:00:00",end_time:"16:00:00"
d7 = HappeningDate.create happening_id:1,daily_flag:false,date:"2018/07/07",start_time:"10:00:00",end_time:"16:00:00"
d8 = HappeningDate.create happening_id:1,daily_flag:false,date:"2018/07/08",start_time:"10:00:00",end_time:"16:00:00"
d9 = HappeningDate.create happening_id:2,daily_flag:true,start_time:"09:00:00",end_time:"19:00:00"
d10 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/11",start_time:"10:00:00",end_time:"17:00:00"
d11 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/12",start_time:"10:00:00",end_time:"17:00:00"
d12 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/13",start_time:"10:00:00",end_time:"21:00:00"
d13 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/14",start_time:"10:00:00",end_time:"17:00:00"
d14 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/15",start_time:"10:00:00",end_time:"21:00:00"
d15 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/16",start_time:"10:00:00",end_time:"21:00:00"
d16 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/17",start_time:"10:00:00",end_time:"17:00:00"
d17 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/18",start_time:"10:00:00",end_time:"17:00:00"
d18 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/19",start_time:"10:00:00",end_time:"17:00:00"
d19 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/20",start_time:"10:00:00",end_time:"21:00:00"
d20 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/21",start_time:"10:00:00",end_time:"17:00:00"
d21 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/22",start_time:"10:00:00",end_time:"17:00:00"
d22 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/23",start_time:"10:00:00",end_time:"17:00:00"
d23 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/24",start_time:"10:00:00",end_time:"17:00:00"
d24 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/25",start_time:"10:00:00",end_time:"17:00:00"
d25 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/26",start_time:"10:00:00",end_time:"17:00:00"
d26 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/27",start_time:"10:00:00",end_time:"21:00:00"
d27 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/28",start_time:"10:00:00",end_time:"17:00:00"
d28 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/29",start_time:"10:00:00",end_time:"17:00:00"
d29 = HappeningDate.create happening_id:3,daily_flag:false,date:"2018/06/30",start_time:"10:00:00",end_time:"17:00:00"
d30 = HappeningDate.create happening_id:4,daily_flag:true,start_time:"10:00:00",end_time:"17:00:00"
d31 = HappeningDate.create happening_id:5,daily_flag:true,start_time:"00:00:01",end_time:"23:59:59"
puts "Created [#{ HappeningDate.all.length }] Happenings Dates"
