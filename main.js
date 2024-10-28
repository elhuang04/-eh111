fetch("cs299-portfolio\index.html");
fetch("cs299-portfolio\project1\index.html");

// navigation bar change active selection item
const links = document.querySelectorAll('.nav-link');
// Add a click event listener to each link
links.forEach(link => {
    link.addEventListener('click', function (event) {
        // Remove the "active" class from all links
        links.forEach(l => l.classList.remove('active'));
        // Add the "active" class to the clicked link
        this.classList.add('active');
    });
});

function toggleDarkMode() {
    const button = document.querySelector('.dark-button');
    const currentMode = document.body.classList.contains('dark-mode');
    if (currentMode) {
        document.body.classList.remove('dark-mode');
        button.textContent = 'Dark Mode';
    } else {
        document.body.classList.add('dark-mode');
        button.textContent = 'Light Mode';
    }
}

function toggleSideBar() {
    const btn = document.querySelector('.collapsible');
    const main = document.querySelector('.main');
    const content = document.querySelector('.table-of-content-container');
    // Instead of 'none', let's check if it's currently visible or not
    if (window.getComputedStyle(content).display === 'none') {
        content.style.display = 'block';
        main.style.marginLeft = "15vw";
        // btn.style.marginLeft = "25vw";
        // btn.innerHTML = "Hide"
    } else {
        content.style.display = 'none';
        main.style.marginLeft = "5vw";
        // btn.style.marginLeft = "0";
        // btn.innerHTML = "Show Table of Contents"
    }
}

// TODO: import csv file, read data --> use as input data to create data visualization
function addRapperCircle(parentId, backgroundUrl, horizontalPosition, verticalPosition, label, description) {
    // Find the parent element by its ID
    const parentElement = document.getElementById(parentId);

    if (!parentElement) {
        console.error(`Parent element with ID "${parentId}" not found.`);
        return;
    }

    // Create the child element
    const rapperCircle = document.createElement('div');
    rapperCircle.className = 'rapper-circle'; // You can define your own CSS class for styling
    rapperCircle.dataset.count = '2988';
    rapperCircle.setAttribute('aria-label', label);
    rapperCircle.setAttribute('role', 'image');
    rapperCircle.style.position = 'absolute';
    rapperCircle.style.width = '22px';
    rapperCircle.style.height = '22px';
    rapperCircle.style.backgroundImage = `url("${backgroundUrl}")`;
    rapperCircle.style.transform = 'translate(-50%, -50%)'; // Center the circle

    // Ensure the image covers the circle
    rapperCircle.style.backgroundSize = 'cover';
    rapperCircle.style.borderRadius = '50%';

    // Add tooltip description
    rapperCircle.title = description;


    // Add hover effect
    rapperCircle.addEventListener('mouseenter', () => {
        rapperCircle.style.border = '2px solid #000'; // Highlight border on hover
    });

    rapperCircle.addEventListener('mouseleave', () => {
        rapperCircle.style.border = '1px solid rgba(0,0,0,.4)'; // Restore original border
    });

    rapperCircle.addEventListener('click', () => {
        rapperCircle.style.zIndex = -1; // Restore original border
    });

    // Append the child element to the parent
    parentElement.appendChild(rapperCircle);

    // Function to update rapper circle position
    function updateRapperCirclePosition() {
        const totalWidth = parentElement.clientWidth;
        // const totalHeight = parentElement.style.height;
        const leftPosition = (horizontalPosition / 100) * (totalWidth+50);
        // vertical position is on a scale from 0 to 200 (backwards)
        // multiply percentage by 200 to be in the same scale
        // then use 200 - (x/100)*200 to get the position
        // if we want something at the x axis (y=0)
        const topPosition = 190 - (verticalPosition*2);

        rapperCircle.style.left = `${leftPosition}px`;
        rapperCircle.style.top = `${topPosition}px`;
    }

    // Call the update function when the window is resized
    window.addEventListener('resize', updateRapperCirclePosition);

    // Initial call to set rapper circle position
    updateRapperCirclePosition();
}


function addVerticalLines(n) {
    const chartAxisTicks = document.getElementById('chart-axis-ticks');

    // Function to recalculate line positions when the window is resized
    function updateLinePositions() {
        const totalWidth = chartAxisTicks.clientWidth;
        const segmentWidth = totalWidth / (n - 1);

        // Update the position of each vertical line
        const lines = chartAxisTicks.querySelectorAll('.vertical-line');
        lines.forEach((line, i) => {
            line.style.left = `${i * segmentWidth}px`;
        });
    }

    // Initial setup: create and append the vertical lines
    for (let i = 0; i < n; i++) {
        const line = document.createElement('div');
        line.classList.add('vertical-line'); // You can define your own CSS class for styling
        chartAxisTicks.appendChild(line);
    }

    // Call the update function when the window is resized
    window.addEventListener('resize', updateLinePositions);

    // Initial call to set line positions
    updateLinePositions();
}
// timestamp modals
function showTimestamps(pickUpType, date, element) {
    const timestamps = {
        '9/25/2024': {
//             "HBO Max: 10:59am, 11:56am, 12:47pm
//              Instagram: 11:07am, 6:54pm"
            'instagram': ['11:07am', '6:54pm'],
            'hbo': ['10:59am', '11:56am', '12:47pm']
        },
        '9/26/2024': {
            // Instagram: 9:02pm
            'instagram': ['9:02pm'],
            'hbo': ["None"]
        },
        '9/27/2024': {
            // Instagram: 5:39pm, 9:20pm
            'instagram': ['5:39pm', '9:20pm'],
            'hbo': ["None"]
        },
        '9/28/2024': {
            'instagram': ["None"],
            'hbo': ['2:33pm', '3:11pm', '4:54pm', '5:55pm', '6:32pm']
        },
        '9/29/2024': {
//             "Instagram 1:38am, 3:16pm, 5:20pm, 7:26pm, 8:00pm, 9:00pm
//              HBO Max: 11:19am"
            'instagram': ['1:38am', '3:16pm', '5:20pm', '7:26pm', '8:00pm', '9:00pm'],
            'hbo': ['11:19am']
        },
        '9/30/2024': {
            'instagram': ["None"],
            'hbo': ["None"]
        },
        '10/1/2024': {
            // Instagram: 6:18am, 11:29pm
            'instagram': ['6:18am', '11:29pm'],
            'hbo': ["None"]
        },
        '10/2/2024': {
            // Instagram: 1:12pm, 5:42pm
            'instagram': ['1:12pm', '5:42pm'],
            'hbo': ["None"]
        }
        
        // Add more dates and their timestamps here
    };

    var card = document.getElementById("timestampCard");
    card.style.display = "block";
    card.style.left = element.getBoundingClientRect().left + "px";
    card.style.top = element.getBoundingClientRect().bottom + window.scrollY + "px";
    card.innerHTML = `<span class="close" onclick="hideCard()">×</span>Timestamps for pick-ups:<br>${timestamps[date][pickUpType].join('<br>')}`;
    event.stopPropagation();

}

function hideCard() {
    document.getElementById("timestampCard").style.display = "none";
}

// carousel next prev
let currentIndex = 0;
function changeSlide(direction) {
    
    const items = document.querySelectorAll('.carousel-item');
    console.log("something should be clicked....")
    console.log(items[currentIndex])
    items[currentIndex].classList.remove('active');
    
    currentIndex = (currentIndex + direction + items.length) % items.length;
    items[currentIndex].classList.add('active');
}


const mediaFiles = ['project-media/Image_20241016135019 - Instagram.jpg', 'project-media/Image_20241016135029 - Instagram.jpg', 'project-media/Image_20241016135034 - Instagram.jpg', 'project-media/Image_20241016135038 - Instagram.jpg', 'project-media/Image_20241016135042 - Instagram.jpg', 'project-media/Image_20241016135045 - Instagram.jpg', 'project-media/Image_20241016135053 - Instagram.jpg', 'project-media/Image_20241022105514 - Offline Music Player.jpg', 'project-media/Image_20241022105518 - Yahoo.jpg', 'project-media/Image_20241022105521 - Yahoo.jpg', 'project-media/Image_20241022105523 - Yahoo.jpg', 'project-media/Image_20241022105528 - Yahoo.png', 'project-media/Image_20241022105531 - Yahoo.jpg', 'project-media/Image_20241022105533 - Yahoo.jpg', 'project-media/Image_20241022105536 - NYTimes.jpg', 'project-media/Image_20241022105539 - NYTimes.jpg', 'project-media/Image_20241022105542 - NYTimes.jpg', 'project-media/Image_20241022105548 - Instagram.jpg', 'project-media/Image_20241022105551 - Instagram.jpg', 'project-media/Image_20241022105554 - Instagram.jpg', 'project-media/Image_20241022105557 - Instagram.jpg', 'project-media/Image_20241022105600 - Instagram.jpg', 'project-media/Image_20241022105604 - Instagram.jpg', 'project-media/Image_20241022105607 - Instagram.jpg', 'project-media/Image_20241022105610 - Instagram.jpg', 'project-media/Image_20241022105613 - Instagram.jpg', 'project-media/Image_20241022105616 - X.jpg', 'project-media/Image_20241022105619 - Pinterest.jpg', 'project-media/Image_20241022105636 - WhatsApp.jpg', 'project-media/Image_20241022105647 - Instagram.jpg', 'project-media/Image_20241022105650 - Instagram.jpg', 'project-media/Image_20241022105653 - Instagram.jpg', 'project-media/Image_20241022105657 - Instagram.jpg', 'project-media/Image_20241022105700 - Instagram.jpg', 'project-media/Image_20241022105719 - Reddit.jpg', 'project-media/Image_20241022105724 - Reddit.jpg', 'project-media/Image_20241022105727 - Reddit.png', 'project-media/Image_20241022105731 - Reddit.jpg', 'project-media/Image_20241022105734 - Reddit.jpg', 'project-media/Image_20241022105737 - Reddit.jpg', 'project-media/Image_20241022105740 - Reddit.jpg', 'project-media/Image_20241022105743 - Apple News.jpg', 'project-media/Image_20241022105747 - Apple News.png', 'project-media/Image_20241022105750 - Apple News.png', 'project-media/Image_20241022105757 - Apple News.jpg', 'project-media/Screen Recording 2024-10-16 150317 - YouTube.mp4', 'project-media/Screen Recording 2024-10-16 150537 - YouTube.mp4', 'project-media/Screen Recording 2024-10-16 151208 - YouTube.mp4', 'project-media/Screen Recording 2024-10-16 151421 - YouTube.mp4', 'project-media/Screen Recording 2024-10-16 151845 - YouTube.mp4', 'project-media/Screen Recording 2024-10-22 094906 - YouTube.mp4', 'project-media/Screenshot 2024-10-16 142531 - YouTube.png', 'project-media/Screenshot 2024-10-16 142712 - Instagram.png', 'project-media/Screenshot 2024-10-16 142728 - Instagram.png', 'project-media/Screenshot 2024-10-16 142749 - Instagram.png', 'project-media/Screenshot 2024-10-16 142803 - Instagram.png', 'project-media/Screenshot 2024-10-16 142825 - Instagram.png', 'project-media/Screenshot 2024-10-16 142857 - Instagram.png', 'project-media/Screenshot 2024-10-16 142914 - Instagram.png', 'project-media/Screenshot 2024-10-16 142929 - Instagram.png', 'project-media/Screenshot 2024-10-16 142949 - Instagram.png', 'project-media/Screenshot 2024-10-16 143012 - Instagram.png', 'project-media/Screenshot 2024-10-16 143032 - Instagram.png', 'project-media/Screenshot 2024-10-16 143051 - Instagram.png', 'project-media/Screenshot 2024-10-16 143118 - Instagram.png', 'project-media/Screenshot 2024-10-16 143215 - Instagram.png', 'project-media/Screenshot 2024-10-16 143357 - Instagram.png', 'project-media/Screenshot 2024-10-16 143433 - Instagram.png', 'project-media/Screenshot 2024-10-16 143455 - Instagram.png', 'project-media/Screenshot 2024-10-16 143554 - Instagram.png', 'project-media/Screenshot 2024-10-16 143614 - Instagram.png', 'project-media/Screenshot 2024-10-16 145039 - YouTube.png', 'project-media/Screenshot 2024-10-16 145318 - YouTube.png', 'project-media/Screenshot 2024-10-16 145436 - YouTube.png', 'project-media/Screenshot 2024-10-16 150150 - YouTube.png', 'project-media/Screenshot 2024-10-16 151742 - YouTube.png', 'project-media/Screenshot 2024-10-16 151904 - YouTube.png', 'project-media/Screenshot 2024-10-22 094744 - YouTube.png']  

function createMediaElements() {
    const container = document.getElementById('media-container');

    mediaFiles.forEach(file => {
        const ext = file.split('.').pop().toLowerCase();
        let mediaElement;

        if (['jpg', 'png', 'gif'].includes(ext)) {
            mediaElement = document.createElement('img');
            mediaElement.src = file;
            mediaElement.alt = "Image";
        } else if (['mp4', 'webm', 'ogg'].includes(ext)) {
            mediaElement = document.createElement('video');
            mediaElement.controls = true;
            const source = document.createElement('source');
            source.src = file;
            source.type = `video/${ext}`;
            mediaElement.appendChild(source);
        }

        container.appendChild(mediaElement);
    });
}

function collapseGallery() {
    var media = document.getElementById("media-container");
    if (media.style.display === "none") {
        media.style.display = "contents";
    } else {
        media.style.display = "none";
    }
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  

// ON CONTENT LOAD-------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    
    createMediaElements();
    console.log("created!!!");
    
     // Open the default tab
    document.querySelector('.tab button').click();

    var links = document.querySelectorAll("td a");
            links.forEach(function(link) {
                link.addEventListener("click", function(event) {
                    event.preventDefault();
                    showTimestamps(link.getAttribute("onclick").split("'")[1], link.getAttribute("onclick").split("'")[3], link);
                });
                link.addEventListener("mouseover", function(event) {
                    showTimestamps(link.getAttribute("onclick").split("'")[1], link.getAttribute("onclick").split("'")[3], link);
                });
            });
    // Call your addRapperCircle function with desired parameters
    addVerticalLines(10);
    
    // static data (pre-processed)
    // TITLES START HERE
    const title = ['Euphoria', '40oz', 'Strawberry', 'Good as Hell', 'About Damn Time', 'Truth Hurts', "Don't Lose Sight", 'Birthday', '22', 'Roar', 'Shut Up and Dance', 'Your Love Is My Drug', 'Party In The U.S.A.', 'Shape of You', 'NO', 'Dynamite', 'Lucky Strike', 'Unwritten', 'All About That Bass', 'New Rules', 'Problem', 'This Is What You Came For', 'Me Too', 'Beautiful Mistakes', 'Strip That Down', 'Just the Way You Are', 'Single Ladies (Put a Ring on It)', 'Levitating', 'Lips Are Movin', 'One More Night', 'Whatcha Say', 'Rockstar', 'Bang Bang', 'Promiscuous', "That's What I Like", "Can't Sleep Love", 'Beauty And A Beat', 'Last Friday Night (T.G.I.F.)', 'Price Tag', '24K Magic', 'Uptown Funk', 'Love On Top', 'Thrift Shop (feat. Wanz)', 'When you wish upon a star', "Boo's Going Home", 'The Scare Games (From "Monsters University"/Score)', 'Monsters, Inc.', 'Alaska', 'Cake By The Ocean', 'Lean On', 'Sugar', 'Only Human', '23', 'Dear Future Husband', 'Please Me', 'Happy (From "Despicable Me 2")', 'Casualty (acoustic-ish)', "Don't Start Now", 'Cold Water', 'More', 'Moves Like Jagger (Studio Recording From "The Voice" Performance)', 'The Lazy Song', 'Señorita', 'Feather', 'High Hopes', 'Jealous', 'Forget You', 'Freckles (acoustic-ish)', "It's a Beautiful Day", "I'm Yours", "Livin' On A Prayer", 'In The Stars', 'Sunset (feat. Cory Wong & Plini)', 'Dancing With Your Ghost', 'Glitter', 'Ophelia', 'Sing', 'Take You Dancing', "Misbehavin'", 'Na Na Na', "Don't You Worry 'Bout A Thing", 'Classic', 'Death of a Bachelor', 'Please Please Please', 'Numb Little Bug', 'La Da Dee', 'Checklist (feat. Chromeo)', 'Anti-Hero', 'Nobody Knows', 'Sweater Weather', 'Riptide', 'Walking On A Dream', 'Put Your Records On', 'Dog Days Are Over', 'Family Business', 'Human', 'Budapest', 'Too Sweet', 'Good Luck, Babe!', 'BIRDS OF A FEATHER', 'Man! I Feel Like A Woman!', 'Good Morning', 'What Makes You Beautiful', 'The Lighthouse', 'Ego', 'Maria Maria', 'Pretty Lies', 'Intentions', 'Pair Of Boots', 'The Weather (Acoustic & Gospel Reprise)', 'Blow for Blow', 'Cheerleader', 'Playing God', 'Blue Sky & The Painter', 'Lioness', 'Genie In A Bottle', 'Sucker', 'Nosey', 'Want To Want Me', 'Levels', 'Gooey', 'Afters', 'Everybody', 'Beautiful', 'Lights Camera Action', 'Smokin Out The Window', 'deadrose', 'Forever', '1, 2 Step', 'Marry You', "C'Mon", 'One Time', 'Time of Our Lives', "You're Hired (feat. Ayra Starr)", 'Girls Like You', 'Magic (feat. Rivers Cuomo)', 'As Long As You Love Me', 'Money Make Her Smile', 'Replay', 'You Da One', "Don't Wanna Know", 'The Other Side', 'One Last Time', 'Troublemaker', 'Casualty', 'Grenade', 'Payphone', "i'm confident that i'm insecure", 'Good Girls Go Bad', 'Locked out of Heaven', "Say You're Just a Friend", 'Whatcha Want', 'What Lovers Do', '23 (acoustic-ish)', 'Finesse', 'Pocketful of Sunshine', 'Freckles', 'Trumpets', "It's Not All About You", 'Bright Lights Bigger City', 'September', 'Maps', 'Down', 'Make A Move', 'Glamorous', 'SUPERBLOOM', 'No Lie', "Nothin' on You (feat. Bruno Mars)", 'Misery', 'Rocketeer', 'decide to be happy', 'We R Who We R', 'MONEY', 'Guy I Used To Be', 'Treasure', 'Goose', 'Ego Death', 'Tummy Hurts', 'Take A Bow', 'Rude', 'Happy Now', 'The Worst', 'Saucy', 'Loud', 'Nightmare', 'Racing into the Night', 'Club Nebula', 'G.O.A.T.', 'Neurotica', 'Reverie', 'Tango', 'Feels', 'Makes Me Wonder', 'Love Never Felt So Good', 'Work', 'Hurricane', 'No Diggity']
    // IMAGE STARTS HERE
    const image = ['https://www.theprp.com/wp-content/uploads/2016/02/polyphiarenaissance.jpg', 'https://th.bing.com/th/id/OIP.4FnTznLVIcISFvKDLGAWsgHaHa?rs=1&pid=ImgDetMain', 'https://i.ytimg.com/vi/uDOunE1tJiA/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgSihhMA8=&rs=AOn4CLBgaQUpA4f5Q5Ibh-ci1Xn0sylOUg', 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/bf/ce/0a/bfce0a2a-8025-9f25-0d18-e9f77c964d4e/075679833518.jpg/1200x1200bf-60.jpg', 'https://th.bing.com/th/id/OIP.6nogIrW9Q5W1lZ2v-oAbJAHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.6gZLoSJiUD6dqxtYv82VewHaHa?rs=1&pid=ImgDetMain', 'https://www.crownnote.com/sites/default/files/dont_lose_sight_singlecover_0.jpg', 'https://img.discogs.com/xNJ1v2UkjK6I-Eqo30qsYNwTybg=/fit-in/583x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6155047-1412544929-2992.jpeg.jpg', 'https://images-na.ssl-images-amazon.com/images/I/51nN1WE9iSL.jpg', 'https://th.bing.com/th/id/OIP.dDLCn5Bn-u9X-p4sxbSJpwHaHa?rs=1&pid=ImgDetMain', 'https://images.genius.com/ea0184ec9b8305c6296703b2db440a61.1000x1000x1.jpg', 'https://th.bing.com/th/id/OIP.ydxDWU-HXEBwAijxsYz1CAHaHa?rs=1&pid=ImgDetMain', 'https://images.genius.com/8ec869ab3b6ee89e16b1f750fcc1a95c.900x900x1.jpg', 'https://i.scdn.co/image/621d2909bcc2c26cd0b274aab0414c9d422a1576', 'https://th.bing.com/th/id/OIP.12Dl1pixKZWKOyPGvIoEfAHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/R.05570c879ad18c1debd3a850810381ae?rik=0qZe6A9lOxUdUQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f_mupIVJbjvuU%2fTHwXhdUUjHI%2fAAAAAAAAGWM%2flSkv1gYwBlg%2fs1600%2fDYNT.jpg&ehk=TwtkGMAIgKIapRzTmBx0AMLDfkT9D76QR1pBkl7yOW4%3d&risl=&pid=ImgRaw&r=0', 'https://img.discogs.com/vWR3IgAcWfB64SW7Nl2wKLaTM1g=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-6116693-1411502503-2417.jpeg.jpg', 'https://img.discogs.com/GU2ql_gQcDXRpqNMlZYprO-zkJs=/fit-in/600x581/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-8125194-1477584092-3389.jpeg.jpg', 'https://api.time.com/wp-content/uploads/2015/01/meghan-trainor-title-cover.jpg?quality=85&w=600', 'https://iscale.iheart.com/catalog/album/52056866', 'https://i.pinimg.com/736x/72/7e/29/727e29a467824c29a73e66006f2b7afd.jpg', 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/59/57/a6/5957a66e-fb10-4065-5739-7c54236339e4/886445857290.jpg/1200x1200bf-60.jpg', 'https://th.bing.com/th/id/R.658d66cfa5399dc58cec9d5a9474cc19?rik=ImEzEXLZtE8ptA&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f43300000%2fMe-Too-meghan-trainor-43319143-750-750.jpg&ehk=LhrVA3d1Vt9IwM9sqvpZl6TVR1q%2fZJjP9z7VfDvv0jk%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.0_km4l9PdUdW8LzZZAj9jgHaHc?rs=1&pid=ImgDetMain', 'https://www.mjsbigblog.com/wp-content/uploads/2017/05/Liam-Payne-Strip-That-Down.jpg', 'https://i.pinimg.com/originals/3c/d8/17/3cd81799b78a444f990ef2ca4e94fd67.png', 'https://th.bing.com/th/id/R.0d476bfe53f8e52301a00af1943accb4?rik=YGFEOniZXfsl9A&pid=ImgRaw&r=0&sres=1&sresct=1', 'https://th.bing.com/th/id/OIP.UsNg_FN0zWYvMJTAsVwz6wHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.CbYDto7havUaY2RDnUIPhAHaHa?rs=1&pid=ImgDetMain', 'https://img.discogs.com/pTp2vtCjkOdic_pKQEV1ZH7S4_M=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-3685161-1340297917-2196.jpeg.jpg', 'https://th.bing.com/th/id/R.fefcda4a3bf5ed97e67e2adc30ad3d37?rik=FTMDythJ%2b36VaA&riu=http%3a%2f%2f1.bp.blogspot.com%2f_ulzYWa0N0qY%2fTD2G7eSMCfI%2fAAAAAAAAAE4%2fDhvz_AIy3NA%2fs1600%2fJD_Cover_Final.jpg_cmyk.jpg&ehk=hBmDJwittaTmlR2gcqLS3aQ%2bVLFWNDql6PSzvHuEwHc%3d&risl=&pid=ImgRaw&r=0', 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Lisa_-_Rockstar.png/220px-Lisa_-_Rockstar.png', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/69416b50-5aaa-490d-8da7-682b35321b11/dcvham4-cc1adeb5-4b66-4cee-b031-43175abc01a2.jpg/v1/fill/w_1280,h_1280,q_75,strp/jessie_j__ariana_grande__nicki_minaj__bang_bang__by_areumdawokpop_dcvham4-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzY5NDE2YjUwLTVhYWEtNDkwZC04ZGE3LTY4MmIzNTMyMWIxMVwvZGN2aGFtNC1jYzFhZGViNS00YjY2LTRjZWUtYjAzMS00MzE3NWFiYzAxYTIuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.F0vMTwrgP6TBeUpt1RtafSCQSvdHX2Nq0jvFCuHRlHM', 'https://img.discogs.com/w7LCX6cUq8UkejofY1-HPTMwdM0=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-786645-1296407576.jpeg.jpg', 'https://images.genius.com/8ceed6dd50d394c19963307b3c63a66e.1000x1000x1.jpg', 'https://th.bing.com/th/id/OIP.tuJzSdpqnF9LrtyrqNxvfwAAAA?rs=1&pid=ImgDetMain', 'https://m.media-amazon.com/images/I/81RkvGf0ZtL._SS500_.jpg', 'https://th.bing.com/th/id/R.29ad4f699f1990a6291e850583a8dd91?rik=tYsPBvr6JzqwmA&riu=http%3a%2f%2fimages.genius.com%2f21052a865b1ab57d6b0429f1f1fe2b8e.1000x1000x1.jpg&ehk=OTu7462rEAuAPVPA1vZlci1zrwZS%2bJaY1NkkNptjiPw%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.da3afeb2e58c0ced2c2898aae6274bcb?rik=DzkJqBE3WSZH1Q&riu=http%3a%2f%2fstatic.idolator.com%2fuploads%2f2011%2f01%2fJessie-J-Who-You-Are.jpg&ehk=MqrFdl7BQjJBBDnwRKR1gTzGjEOO1osBc5%2fmCdW0ex8%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.1wK1pEVy6GtWxUrPVkrFMwHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/R.15bb5375ed9feb2f2bfdbdb5abf26640?rik=jy3eolRM5dvBFA&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.iEg0YyvZauCRxWgLmxrKnQAAAA?rs=1&pid=ImgDetMain', 'https://img.discogs.com/96ALtBOtvHXZKvYXDouQ0NImUo4=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-10322996-1495311812-9570.jpeg.jpg', 'https://i.pinimg.com/736x/3b/bd/64/3bbd64e531ebd39af08b67068a1b4522--stars.jpg', 'https://i.scdn.co/image/ab67616d0000b273ba7c9946402feb80e664a9aa', 'https://th.bing.com/th/id/OIP.3PUZ_lgUun6eJFL1GZtWqgAAAA?rs=1&pid=ImgDetMain', 'https://i.scdn.co/image/ab67616d0000b273ba7c9946402feb80e664a9aa', 'https://th.bing.com/th/id/OIP.KtHp2G-FQgMiWox1l7Na8gHaHa?rs=1&pid=ImgDetMain', 'https://secretfangirls.files.wordpress.com/2015/09/dnce-cake-by-the-ocean-2015.png', 'https://images.rapgenius.com/505685ff04b726c485bdbb1dc270b7ea.1000x1000x1.png', 'https://img.discogs.com/octh4BTpsKiT-WvRQ6gVlnRJHM4=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-11098799-1509825632-8385.jpeg.jpg', 'https://images.genius.com/6fb9a5895efa09cca8db06547f2b2218.1000x1000x1.png', 'https://images.genius.com/3b9bab56fa6a4b388b8cee449df7f74e.264x264x1.jpg', 'https://img.discogs.com/NejnFIFQuZdlQLG3G-H3GQihtgs=/fit-in/500x435/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-7194634-1435858242-6714.jpeg.jpg', 'https://th.bing.com/th/id/OIP.nAj-xQy7J_vgEEStQL5vQwAAAA?rs=1&pid=ImgDetMain', 'https://i.scdn.co/image/6703af07b93df3e74c3f5227b09dac9e06957b49', 'https://m.media-amazon.com/images/I/51kAXClvmkL.jpg', 'https://i0.wp.com/abitofpopmusic.com/wp-content/uploads/2019/10/dua-lipa-dont-start-now.jpg?resize=1024%2C1024&ssl=1', 'https://images.genius.com/fcbb9f99e72af79537b124f0fc4084d0.1000x1000x1.jpg', 'https://theartsdesk.com/sites/default/files/styles/mast_image_landscape/public/mastimages/atlantic-lp-lizzo-special-purple-vinyl.jpg?itok=-qySuhmn', 'https://th.bing.com/th/id/OIP.zn3WlK9gORhtWLNUAUvufAHaHa?rs=1&pid=ImgDetMain', 'https://img.discogs.com/0NHah0G5bVr-gWqqNKbA4Cf_Cmk=/fit-in/600x527/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-2903876-1306524993.jpeg.jpg', 'https://th.bing.com/th/id/OIP.lOyA29KwRLDBEyBzqab9sQHaHa?rs=1&pid=ImgDetMain', 'https://target.scene7.com/is/image/Target/GUEST_699f9815-5d4b-47dd-b7dd-61b329045158?wid=626&hei=626&qlt=80&fmt=pjpeg', 'https://th.bing.com/th/id/OIP.EdSn4qzpr4aomL2LfotOvAAAAA?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/R.51ff5e9294dfc82c77fcb2759f843fa8?rik=XIiZc5xKBwZwHA&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.QyEjV3pwkico1C5lNQNQyQHaHW?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.X5JQ0Oo9_DwbHPcVo3ORwgAAAA?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.5zhjhc27ue4rwYOjZjb2NQHaHa?rs=1&pid=ImgDetMain', 'https://images.genius.com/e2edbf184958a0030845a25411b37517.1000x1000x1.jpg', 'https://th.bing.com/th/id/R.99eea20cd93f45b4b07e8d4aae23b04a?rik=ax1DewKtNArz8w&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.k0avT6H7n5eZw7JL9jfZ3wHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.Stzp7zQ7Zi3gvh5uapcfegHaEK?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.EymRSskmeM0JU0teTPuP_AHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.TV1kRWOXs_JBIw5QSjVYrwAAAA?rs=1&pid=ImgDetMain', 'https://albumart.publicradio.org/mb/3a/3afcf111-fc5d-4b7c-9712-55d225f4b2eb_96af.jpg', 'https://vignette.wikia.nocookie.net/thepentatonix/images/7/7b/Pentatonix.jpg/revision/latest?cb=20160723040946', 'https://mphiphop.com/wp-content/uploads/2020/08/Jason-Derulo-Take-You-Dancing-R3HAB-Remix.jpg', 'https://vignette.wikia.nocookie.net/thepentatonix/images/7/7b/Pentatonix.jpg/revision/latest?cb=20160723040946', 'https://vignette.wikia.nocookie.net/thepentatonix/images/7/7b/Pentatonix.jpg/revision/latest?cb=20160723040946', 'https://th.bing.com/th/id/OIP.LlLLTlq9q5fmfTlamZUx3wHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/R.6a465606bb38bb2a9163e99ce60cfc9e?rik=h2S2McFVfBW7Gg&riu=http%3a%2f%2fwww.noise11.com%2fwp%2fwp-content%2fuploads%2f2014%2f02%2fMKTO.jpg&ehk=crwJhoIq%2bMB%2frruf7otbbPv4GTgmdUvWnI%2fbhxBC0ls%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.2b07b905967ffa4078e7130cb1aaba7c?rik=sBlINhNuXmBH2A&riu=http%3a%2f%2fnew-transcendence.com%2fwp-content%2fuploads%2f2016%2f01%2fPATD_Cover_FINAL_Death_of_a_Bachelor.jpg&ehk=SDG1eJ%2bjLWCtmb6CiFZyMfv1LRAuvvIoZrGhtHVCbwY%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.9_Jz_zctOmss-80b90YLQwHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/R.5deb78ff34a29b341aeb5681fdba99a8?rik=kAUxaI81CnwnFQ&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.1qSz23K_wlPU09EUVVg5bwHaHa?rs=1&pid=ImgDetMain', 'https://linkstorage.linkfire.com/medialinks/images/eafe64aa-59ac-436d-a3ef-7b1583dcae89/artwork-440x440.jpg', 'https://albumart.publicradio.org/mb/0d/0dcc84fb-c592-46e9-ba92-a52bb44dd553_2dfe.jpg', 'https://is3-ssl.mzstatic.com/image/thumb/Music20/v4/e7/6c/7b/e76c7b6e-15fa-a402-835e-033f6ac33fc4/UMG_cvrart_00050087349448_01_RGB72_1800x1800_16DMGIM07712.jpg/268x0w.jpg', 'https://i.pinimg.com/736x/f4/8a/51/f48a516c37519cd18c75613f976507f8--music-search-the-neighbourhood.jpg', 'https://th.bing.com/th/id/OIP.V44oAqldCpe3s6j4A_CXIwHaHa?rs=1&pid=ImgDetMain', 'https://is5-ssl.mzstatic.com/image/thumb/Music/v4/a7/81/48/a781480a-a439-b2dd-6474-5f77d2f7161a/source/1200x1200bb.jpg', 'https://lastfm.freetls.fastly.net/i/u/ar0/52f1205e591943e89627b5a4511b24a0.jpg', 'https://th.bing.com/th/id/OIP.PI1sfrtdz8V7DK96ZFwGFgHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.OIlMxA2u60t2kspW1WGbaAAAAA?rs=1&pid=ImgDetMain', 'https://media.s-bol.com/qJQD5y66DLk/1200x898.jpg', 'https://th.bing.com/th/id/R.25a4ff14891ab355383d06f00054f83f?rik=bI97Zo2rZf%2b%2bwg&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.bXaZJR7JrdIxZxlLv6A0bAHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.dOkZzI3I3Bu5NprgN58vEgHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.pouGuJRtRzo_vShYPifApgHaHT?rs=1&pid=ImgDetMain', 'https://i.pinimg.com/736x/4e/7f/09/4e7f090132b75efebd6202ae646296d2--come-on-over-feel-like.jpg', 'https://t2.genius.com/unsafe/164x164/https%3A%2F%2Fimages.genius.com%2Fc3b5d1ffec289d1160291e470a442f83.1000x1000x1.png', 'https://c2.staticflickr.com/8/7045/6935743493_1a61ce44b1_z.jpg', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiStxB-MyhyphenhyphenkCz-MAEJc7tmRmbQ_MJCcHmuddcHWkFFCaB5Qq6HsE26-Vz98ygu-rbXwImcY0inw3EGpfcFtUB1HD30mBXyr8Q-u_vQHlB4dMhOVFRrs2XwPFNI62u7NDdIZTPuGSxTa_mvdNllh-3_9MYV8A9H10l5xUSU2Epcnisyase-w6oIpduJXKU/s320-rw/Stevie%20Nicks%20The%20Lighthouse.jpeg', 'https://th.bing.com/th/id/OIP.hp1i5mVD6ptCSSguIqdU2wAAAA?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.wYM7NlgOBfoU7XceuB_xxQAAAA?rs=1&pid=ImgDetMain', 'https://images.genius.com/6c89cc2cd8730533165d684edd36d4b8.872x872x1.png', 'https://f4.bcbits.com/img/a4282832058_10.jpg', 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/78/da/e0/78dae0e1-5236-0ccf-23ad-14ffc8e37b43/24UMGIM60049.rgb.jpg/1200x1200bf-60.jpg', 'https://th.bing.com/th/id/OIP.bz1hU0i31kJoUrHwR-x2HQHaHa?rs=1&pid=ImgDetMain', 'https://upload.wikimedia.org/wikipedia/en/9/9a/Tee_Grizzley_-_Blow_for_Blow.jpg', 'https://th.bing.com/th/id/OIP.KE8QoqPqOP32OQPvPAo5JQHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.re4cSA8g2dwUY1PwGgScpwHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.JuCdSym19F4OhGa6WEjY2gHaG0?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.OAOGpPRx6x8CrliEQqGSXQAAAA?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/R.ddf8449b419db4a7e180d03ebf4ce388?rik=bXQx%2bZpjAtnvIg&riu=http%3a%2f%2fwww.allbum.it%2fimages%2fchristina-aguilera-genie-in-a-bottle-1.jpg&ehk=Y7KLlX%2bKChB9H3CyLClsfteM8w%2bONItBXZU9RUGZB9Y%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.6J4HzgNRNjatTEtId2xcJQHaHa?rs=1&pid=ImgDetMain', 'https://t2.genius.com/unsafe/164x164/https%3A%2F%2Fimages.genius.com%2F981f74bf2222c73f8df4e5136e0971f6.1000x1000x1.jpg', 'https://th.bing.com/th/id/R.4015294494d90281fb1abb62c660c372?rik=p6SKNtBxgvrPpA&riu=http%3a%2f%2fpopsoap.it%2fwp-content%2fuploads%2f2015%2f03%2fJason-Derulo-cover-singolo.jpg&ehk=tz7vv7QBRVY0wGGLY%2fHaHJksOXqK2nPFdY%2fho3nFE6k%3d&risl=&pid=ImgRaw&r=0', 'https://spatel1305.files.wordpress.com/2015/08/nick-jonas-levels-cover-art-cropped-sexy-leather-jacket.jpg', 'https://th.bing.com/th/id/OIP.XKqgXZZ95jNuxhQoT4jQlAHaHj?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.figqtRy0mGeHAj4V50SBeQHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.ZcQ4jGiMIpPuSB58Orsv4gHaHa?rs=1&pid=ImgDetMain', 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9c/a1/54/9ca1544e-7de5-2f42-62b8-10fc6c082b27/075679864895.jpg/1200x1200bf-60.jpg', 'https://thatgrapejuice.net/wp-content/uploads/2024/09/Kylie-Minogue-Tension-II-2-tgj.jpg', 'https://m.media-amazon.com/images/I/61-v4KvjnRL._SX300_SY300_QL70_FMwebp_.jpg', 'https://th.bing.com/th/id/R.0fbc683b948c3dc79b12ce57238c1251?rik=moxL6SeCOYnGeA&pid=ImgRaw&r=0', 'https://images.genius.com/d2bde162064a1bae480b830be019dfed.1000x1000x1.jpg', 'https://th.bing.com/th/id/R.e258bb60146de6c37d1291a69b03d6c5?rik=CDToLJL0X34zeA&pid=ImgRaw&r=0', 'https://1.bp.blogspot.com/-omKgHaHqTmw/VkGFHRNvuaI/AAAAAAAAJTo/xcDSgUng_co/s1600/Bruno%2BMars%2B-%2BMarry%2BYou%2B-%2B%2528Promo%2BDigital%2BSingle%2529%2B-%2B%2528Lp%2BCover%2529-djnastyboy.blogspot.com.jpg', 'https://th.bing.com/th/id/OIP.FLC4KdNrT8muTXnLJLtvtQHaHa?rs=1&pid=ImgDetMain', 'https://images.genius.com/073a663667e62572347088a35312123a.1000x1000x1.jpg', 'https://images.rapgenius.com/f0650ca0939a21e741d343c7e9f3117d.600x600x1.jpg', 'https://th.bing.com/th/id/OIP.YxVltlYBRJhVCmfGvuWFcwHaHa?rs=1&pid=ImgDetMain', 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1a/7e/42/1a7e428a-4449-b613-46c3-5fa75d83047a/00602567702023.rgb.jpg/1200x1200bf-60.jpg', 'https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/bc/f8/ed/bcf8ed12-42b0-b50f-9dab-e9124d26137a/mzi.rklkakdk.jpg/1200x1200bf-60.jpg', 'https://th.bing.com/th/id/OIP.W5KshJxgivcW-uYGt3IeZwHaHa?rs=1&pid=ImgDetMain', 'https://target.scene7.com/is/image/Target/GUEST_83d7933b-46eb-4e23-80d8-1b3351d9f2f8?wid=400&hei=400&qlt=80&fmt=webp', 'https://th.bing.com/th/id/R.57feab97b277ac400a89cf50d1724999?rik=h%2f0mfSjfDWuc7A&riu=http%3a%2f%2fis3.mzstatic.com%2fimage%2fthumb%2fMusic%2fv4%2f9c%2ff8%2f6a%2f9cf86a81-55bb-1738-f62e-b69fcae303bc%2fsource%2f600x600bb.jpg&ehk=VCsp9fJLZgaaGPykB4qt6%2fMCSEJB18PnoXvcg2f7WKw%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.aowzVAj4RtZrkxZEymlD8gHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/R.7ecdfc7f7501e403757f8b1ac9db3104?rik=q8HBdK5B6jS7pA&riu=http%3a%2f%2fs3.amazonaws.com%2fhiphopdx-production%2f2016%2f10%2fMaroon-5-f.-Kendrick-Lamar-Dont-Wanna-Know-696x696.jpg&ehk=hdY13VNdZv4SlKPfjuL%2f%2fjtaEHZPrvzHeOj%2bck5Q014%3d&risl=&pid=ImgRaw&r=0', 'https://1.bp.blogspot.com/-omKgHaHqTmw/VkGFHRNvuaI/AAAAAAAAJTo/xcDSgUng_co/s1600/Bruno%2BMars%2B-%2BMarry%2BYou%2B-%2B%2528Promo%2BDigital%2BSingle%2529%2B-%2B%2528Lp%2BCover%2529-djnastyboy.blogspot.com.jpg', 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b6/77/0b/b6770b2a-abef-8be4-e2ed-cba1bd5a2f0c/00602557769692.rgb.jpg/1200x1200bf-60.jpg', 'https://th.bing.com/th/id/R.96454f4afac5e0c940604904d2407993?rik=8GzXrqh%2bDpzLMA&riu=http%3a%2f%2ffarm9.staticflickr.com%2f8454%2f8049530388_b6b18ecddc_z.jpg&ehk=8OG8tsg19atH8kafQzbglFFYKPTPZ9MRlWt9jLoVz48%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.D_dqiEPOVf7UIpmKlrRT8wHaHa?rs=1&pid=ImgDetMain', 'https://images-na.ssl-images-amazon.com/images/I/81c-XgX-g7L._SL1425_.jpg', 'https://th.bing.com/th/id/R.281fa4d6bd8ab22d1d99b4980568e126?rik=uelULaRpxihHQQ&pid=ImgRaw&r=0&sres=1&sresct=1', 'https://th.bing.com/th/id/OIP.wpNHXF4aZpgOSmBojFLv5QHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/R.ae5cc48f0c0e5e042deabdb8ef9dec86?rik=BW1X5jJw6uhRhg&riu=http%3a%2f%2fwww.thesource4ym.com%2fimages%2fiicor45%2f485225606678-cobra_starship.png&ehk=9wtjgyds8SxQ8mBJRrM7SRedmRZwST6xSgzuJ1Fwt%2fs%3d&risl=&pid=ImgRaw&r=0', 'https://target.scene7.com/is/image/Target/GUEST_83d7933b-46eb-4e23-80d8-1b3351d9f2f8?wid=400&hei=400&qlt=80&fmt=webp', 'https://images.rapgenius.com/62c40519d2e9675268bc8cb007c698c2.1000x1000x1.jpg', 'https://img.discogs.com/Gz0mBkYtnSxREKdyrCrqMUMI8Ig=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-200399-1375645307-6640.jpeg.jpg', 'https://th.bing.com/th/id/OIP.HJI08OlshbmpfyXIfZdvjAHaHa?rs=1&pid=ImgDetMain', 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d2/a5/db/d2a5dbda-a634-4e01-0fdc-aab4421149a8/193436364072_AcousticishCover.jpg/1200x1200bf-60.jpg', 'https://iscale.iheart.com/catalog/album/55029693', 'https://th.bing.com/th/id/OIP.Fz0rUvEfFQNvQz8JyeaFKQHaHi?rs=1&pid=ImgDetMain', 'https://i.pinimg.com/736x/27/2a/6d/272a6dc4d09b9a63b64b7d74df061297.jpg ', 'https://th.bing.com/th/id/OIP.uf22KzwAWAyRoprPWnWK-QAAAA?rs=1&pid=ImgDetMain', 'https://images.genius.com/b1333122fe91649d1a8c66e261fbee0a.1000x1000x1.jpg', 'https://th.bing.com/th/id/OIP.CjXaAKoTz5dfOWPqoZpnhQHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/R.ba0114aaa26b7117f4c5de0aacfc65cf?rik=2Q5fv6qO4P9iyA&pid=ImgRaw&r=0', 'https://m.media-amazon.com/images/I/A1-j3IIiyIL._UF1000,1000_QL80_.jpg', 'https://th.bing.com/th/id/OIP.FZJowsLWkdFNfs1NWmkjzQAAAA?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.W4GcLs6epNTcB5QLNKLaBQHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.U9zD6s9lzw29xGnhbqwq5QHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/R.daee3a2a1c5aceaa0dbc229de1d8a7d0?rik=tJ%2bGgrCOI1tevw&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.t_XloF-c8aVHZjhpO2NAsQHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.5Apt-NPIWvoUJfL4PlBrNwHaGs?rs=1&pid=ImgDetMain', 'https://img.discogs.com/nQAELfNtaIHnUKD3vHciPpKcKMI=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-2505859-1289684355.jpeg.jpg', 'https://th.bing.com/th/id/OIP.lhxHY39a-mXNCzCv6ns_6AAAAA?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/R.daee3a2a1c5aceaa0dbc229de1d8a7d0?rik=tJ%2bGgrCOI1tevw&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.a4ecc6887a3433e9cc0131c3bfce24d3?rik=7SfHxjm35Q%2fGxg&riu=http%3a%2f%2fstarcasm.net%2fwp-content%2fuploads%2f2010%2f10%2fKesha_WeRWhoWeR.jpg&ehk=VJ%2fIB%2fM2vdLy0H1%2bIVo19lVAQWzYvVa3SoNAARUw48I%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.JDkelyEmnzVAjvFLH0RnxAHaHa?rs=1&pid=ImgDetMain', 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/87/42/0f/87420f3e-cf44-8497-8765-d0f2e483dfc4/193436376044_GIUTB.jpg/1200x1200bf-60.jpg', 'https://target.scene7.com/is/image/Target/GUEST_83d7933b-46eb-4e23-80d8-1b3351d9f2f8?wid=400&hei=400&qlt=80&fmt=webp', 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5a/7a/1d/5a7a1d5d-1692-a711-975b-ca07763acfe5/859721867894_cover.jpg/1200x1200bf-60.jpg', 'https://th.bing.com/th/id/OIP.4KTeCkRbK9JGe_7cbM1xxwHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.fnkYeTVYwxb9CzSllBc3rgHaHa?rs=1&pid=ImgDetMain', 'https://lyricsfa.com/wp-content/uploads/2021/07/Rihanna-Take-A-Bow-Lyrics.jpg', 'https://th.bing.com/th/id/R.fa5b0d50e75d599e8567fe5d6caeedd6?rik=6hEGTOpMCwxD2w&riu=http%3a%2f%2fimages.genius.com%2f97f929550e40115e09aa3881149bd46f.220x220x1.jpg&ehk=RbUUHirXF%2bxHSrdQH%2bjuPfTQG5OzgJ816jUY6UD2%2fJU%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.9Yv8rxDxBuYKyFbRs3jMlQHaHa?rs=1&pid=ImgDetMain', 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5a/7a/1d/5a7a1d5d-1692-a711-975b-ca07763acfe5/859721867894_cover.jpg/1200x1200bf-60.jpg', 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/57/5c/00/575c009a-6d69-6ac4-7c91-7e307d920279/794558040969.jpg/1200x1200bf-60.jpg', 'https://preview.redd.it/has-anyone-ever-noticed-that-tims-tats-look-like-the-album-v0-vvq549jl4wga1.jpg?auto=webp&s=7cd47cb164f626220525c670a1cb335667a1fb38', 'https://preview.redd.it/has-anyone-ever-noticed-that-tims-tats-look-like-the-album-v0-vvq549jl4wga1.jpg?auto=webp&s=7cd47cb164f626220525c670a1cb335667a1fb38', 'https://img.discogs.com/QE8fhBvkchT2G6HY5eSgNwm_Drw=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-16087291-1603203469-1159.jpeg.jpg', 'https://i.ytimg.com/vi/OF3iMCw8gKo/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGBMgWyh_MA8=&rs=AOn4CLCSJadogIhdL9X_5SReV3DRu3S6Tg', 'https://th.bing.com/th/id/OIP.A-mQU2AUVnhEwcwj9C7UBAHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.azFJlWroKA-OcYUVTZ60ewHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.azFJlWroKA-OcYUVTZ60ewHaHa?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/R.997ef0921ab0607f1948e6dac2d4b70a?rik=KdWLJcZO5qyxcw&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.3117d0650de1a2d478dde39f54d8aaa5?rik=nhs%2fL7MzPznHfQ&pid=ImgRaw&r=0', 'https://images.genius.com/b4540800e49e1be94160165798f2dfd5.1000x1000x1.jpg', 'https://th.bing.com/th/id/R.e3366ae06ceae23ead70035f114f56c0?rik=PPPnUrMVNebO3w&riu=http%3a%2f%2fhiphop-n-more.com%2fwp-content%2fuploads%2f2014%2f05%2flove-never-felt-so-good.jpg&ehk=8xZ9N6VbQ3tKccKZJkIEOLN%2b%2bdQnu6Myn9kBhn0fwDY%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.b2870245192a01aa10b93550f272e8ee?rik=bfeStkKdHL37Qw&riu=http%3a%2f%2fheadlineplanet.com%2fhome%2fwp-content%2fuploads%2f2016%2f02%2fFifth-Harmony-Album-Cover.jpg&ehk=xL7QvHtFG8DgOnp21uUA9gHCAy8M1%2f8vtjXVZ57OEtE%3d&risl=&pid=ImgRaw&r=0', 'https://i.scdn.co/image/6d982b80f053cc58d4e76ffc105d2f7b19b6e200', 'https://th.bing.com/th/id/R.a32400e91d04f168668591bf89ff7e39?rik=Q4ZMb%2bg0NykCHw&riu=http%3a%2f%2f1.bp.blogspot.com%2f-aPDL54SB1tM%2fTyuXKB_T08I%2fAAAAAAAAHuc%2fbYdnuU89jkg%2fs1600%2f1.JPG&ehk=EHU3n5W14g8hFhRyg4CWt51p%2b5LJ4v9UyzjTdrECG9g%3d&risl=&pid=ImgRaw&r=0']
    // X-VALS START HERE
    const xval = [50.0, 50.0, 45.0, 50.0, 40.0, 50.0, 40.0, 45.0, 45.0, 50.0, 50.0, 42.0, 50.0, 50.0, 50.0, 50.0, 50.0, 46.66666667, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 44.0, 50.0, 37.5, 37.5, 37.5, 51.11111111, 45.0, 45.0, 43.33333333, 40.0, 45.0, 55.0, 45.0, 30.0, 30.0, 30.0, 30.0, 53.33333333, 30.0, 30.0, 35.0, 30.0, 45.0, 30.0, 30.0, 30.0, 30.0, 30.0, 35.0, 43.33333333, 30.0, 30.0, 30.0, 30.0, 40.0, 42.5, 43.33333333, 30.0, 30.0, 30.0, 80.0, 80.0, 60.0, 80.0, 80.0, 80.0, 65.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 46.66666667, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 60.0, 60.0, 60.0, 60.0, 60.0, 60.0, 60.0, 60.0, 60.0, 60.0, 60.0, 60.0, 60.0, 60.0, 50.0, 50.0, 50.0, 60.0, 60.0, 60.0, 50.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0]

    const yval = [30, 30, 40, 10, 20, 10, 30, 20, 20, 10, 10, 50, 10, 10, 10, 10, 10, 30, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 50, 30, 40, 40, 40, 90, 20, 20, 30, 20, 20, 20, 20, 60, 10, 10, 10, 30, 10, 10, 20, 10, 20, 10, 10, 10, 10, 10, 20, 30, 10, 10, 10, 10, 20, 40, 30, 10, 10, 10, 10, 10, 20, 10, 10, 10, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 10, 10, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 30, 10, 20, 10, 10, 20, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 10, 10, 10, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    // DESCRIPTIONS START HERE

    const desc = ['💿 Song Title: Euphoria\n🎤 Artist: Polyphia\n📍: (5,3)', '💿 Song Title: 40oz\n🎤 Artist: Polyphia\n📍: (5,3)', "💿 Song Title: Strawberry\n🎤 Artist: Snail's House\n📍: (4.5,4)", '💿 Song Title: Good as Hell\n💿  Artist: Lizzo & Ariana Grande\n📍: (5,1)', '💿 Song Title: About Damn Time\n🎤 Artist: Lizzo\n📍: (4,2)', '💿 Song Title: Truth Hurts\n🎤 Artist: Lizzo\n📍: (5,1)', "💿 Song Title: Don't Lose Sight\n🎤 Artist: Lawrence\n📍: (4,3)", '💿 Song Title: Birthday\n🎤 Artist: Katy Perry\n📍: (4.5,2)', '💿 Song Title: 22\n🎤 Artist: Taylor Swift\n📍: (4.5,2)', '💿 Song Title: Roar\n🎤 Artist: Katy Perry\n📍: (5,1)', '💿 Song Title: Shut Up and Dance\n🎤 Artist: WALK THE MOON\n📍: (5,1)', '💿 Song Title: Your Love Is My Drug\n🎤 Artist: Kesha\n📍: (4.2,5)', '💿 Song Title: Party In The U.S.A.\n🎤 Artist: Miley Cyrus\n📍: (5,1)', '💿 Song Title: Shape of You\n🎤 Artist: Ed Sheeran\n📍: (5,1)', '💿 Song Title: NO\n🎤 Artist: Meghan Trainor\n📍: (5,1)', '💿 Song Title: Dynamite\n🎤 Artist: Taio Cruz\n📍: (5,1)', '💿 Song Title: Lucky Strike\n🎤 Artist: Maroon 5\n📍: (5,1)', '💿 Song Title: Unwritten\n🎤 Artist: Natasha Bedingfield\n📍: (4.66666666666667,3)', '💿 Song Title: All About That Bass\n🎤 Artist: Meghan Trainor\n📍: (5,1)', '💿 Song Title: New Rules\n🎤 Artist: Dua Lipa\n📍: (5,1)', '💿 Song Title: Problem\n🎤 Artist: Ariana Grande\n📍: (5,1)', '💿 Song Title: This Is What You Came For\n🎤 Artist: Calvin Harris\n📍: (5,1)', '💿 Song Title: Me Too\n🎤 Artist: Meghan Trainor\n📍: (5,1)', '💿 Song Title: Beautiful Mistakes\n🎤 Artist: Maroon 5\n📍: (5,1)', '💿 Song Title: Strip That Down\n🎤 Artist: Liam Payne\n📍: (5,1)', '💿 Song Title: Just the Way You Are\n🎤 Artist: Bruno Mars\n📍: (5,1)', '💿 Song Title: Single Ladies (Put a Ring on It)\n🎤 Artist: Beyoncé\n📍: (5,1)', '💿 Song Title: Levitating\n🎤 Artist: Dua Lipa\n📍: (5,1)', '💿 Song Title: Lips Are Movin\n🎤 Artist: Meghan Trainor\n📍: (5,1)', '💿 Song Title: One More Night\n🎤 Artist: Maroon 5\n📍: (5,1)', '💿 Song Title: Whatcha Say\n🎤 Artist: Jason Derulo\n📍: (4.4,5)', '💿 Song Title: Rockstar\n🎤 Artist: LISA\n📍: (5,3)', '💿 Song Title: Bang Bang\n🎤 Artist: Ariana Grande\n📍: (3.75,4)', '💿 Song Title: Promiscuous\n🎤 Artist: Nelly Furtado\n📍: (3.75,4)', "💿 Song Title: That's What I Like\n🎤 Artist: Bruno Mars\n📍: (3.75,4)", "💿 Song Title: Can't Sleep Love\n🎤 Artist: Pentatonix\n📍: (5.11111111111111,9)", '💿 Song Title: Beauty And A Beat\n🎤 Artist: Justin Bieber\n📍: (4.5,2)', '💿 Song Title: Last Friday Night (T.G.I.F.)\n🎤 Artist: Katy Perry\n📍: (4.5,2)', '💿 Song Title: Price Tag\n🎤 Artist: Jessie J\n📍: (4.33333333333333,3)', '💿 Song Title: 24K Magic\n🎤 Artist: Bruno Mars\n📍: (4,2)', '💿 Song Title: Uptown Funk\n🎤 Artist: Mark Ronson\n📍: (4.5,2)', '💿 Song Title: Love On Top\n🎤 Artist: Beyoncé\n📍: (5.5,2)', '💿 Song Title: Thrift Shop (feat. Wanz)\n🎤 Artist: Macklemore\n📍: (4.5,2)', '💿 Song Title: When you wish upon a star\n🎤 Artist: The Disney Studio Orchestra\n📍: (3,6)', "💿 Song Title: Boo's Going Home\n🎤 Artist: Randy Newman\n📍: (3,1)", '💿 Song Title: The Scare Games (From "Monsters University"/Score)\n🎤 Artist: Randy Newman\n📍: (3,1)', '💿 Song Title: Monsters, Inc.\n🎤 Artist: Randy Newman\n📍: (3,1)', '💿 Song Title: Alaska\n🎤 Artist: Maggie Rogers\n📍: (5.33333333333333,3)', '💿 Song Title: Cake By The Ocean\n🎤 Artist: DNCE\n📍: (3,1)', '💿 Song Title: Lean On\n🎤 Artist: Major Lazer\n📍: (3,1)', '💿 Song Title: Sugar\n🎤 Artist: Maroon 5\n📍: (3.5,2)', '💿 Song Title: Only Human\n🎤 Artist: Jonas Brothers\n📍: (3,1)', '💿 Song Title: 23\n🎤 Artist: Lawrence\n📍: (4.5,2)', '💿 Song Title: Dear Future Husband\n🎤 Artist: Meghan Trainor\n📍: (3,1)', '💿 Song Title: Please Me\n🎤 Artist: Cardi B\n📍: (3,1)', '💿 Song Title: Happy (From "Despicable Me 2")\n🎤 Artist: Pharrell Williams\n📍: (3,1)', '💿 Song Title: Casualty (acoustic-ish)\n🎤 Artist: Lawrence\n📍: (3,1)', "💿 Song Title: Don't Start Now\n🎤 Artist: Dua Lipa\n📍: (3,1)", '💿 Song Title: Cold Water\n🎤 Artist: Major Lazer & Justin Bieber\n📍: (3.5,2)', '💿 Song Title: More\n🎤 Artist: Lizzo\n📍: (4.33333333333333,3)', '💿 Song Title: Moves Like Jagger (Studio Recording From "The Voice" Performance)\n🎤 Artist: Maroon 5\n📍: (3,1)', '💿 Song Title: The Lazy Song\n🎤 Artist: Bruno Mars\n📍: (3,1)', '💿 Song Title: Señorita\n🎤 Artist: Shawn Mendes\n📍: (3,1)', '💿 Song Title: Feather\n🎤 Artist: Sabrina Carpenter\n📍: (3,1)', '💿 Song Title: High Hopes\n🎤 Artist: Panic! At The Disco\n📍: (4,2)', '💿 Song Title: Jealous\n💿  Artist: Nick Jonas\n📍: (4.25,4)', '💿 Song Title: Forget You\n🎤 Artist: CeeLo Green\n📍: (4.33333333333333,3)', '💿 Song Title: Freckles (acoustic-ish)\n🎤 Artist: Lawrence\n📍: (3,1)', "💿 Song Title: It's a Beautiful Day\n🎤 Artist: Michael Bublé\n📍: (3,1)", "💿 Song Title: I'm Yours\n🎤 Artist: Jason Mraz\n📍: (3,1)", "💿 Song Title: Livin' On A Prayer\n🎤 Artist: Bon Jovi\n📍: (8,1)", '💿 Song Title: In The Stars\n💿  Artist: Benson Boone\n📍: (8,1)', '💿 Song Title: Sunset (feat. Cory Wong & Plini)\n🎤 Artist: Tim Henson\n📍: (6,2)', '💿 Song Title: Dancing With Your Ghost\n🎤 Artist: Sasha Alex Sloan\n📍: (8,1)', '💿 Song Title: Glitter\n🎤 Artist: BENEE\n📍: (8,1)', '💿 Song Title: Ophelia\n🎤 Artist: The Lumineers\n📍: (8,1)', '💿 Song Title: Sing\n🎤 Artist: Pentatonix\n📍: (6.5,2)', '💿 Song Title: Take You Dancing\n🎤 Artist: Jason Derulo\n📍: (5,1)', "💿 Song Title: Misbehavin'\n🎤 Artist: Pentatonix\n📍: (5,1)", '💿 Song Title: Na Na Na\n🎤 Artist: Pentatonix\n📍: (5,1)', "💿 Song Title: Don't You Worry 'Bout A Thing\n🎤 Artist: Tori Kelly\n📍: (5,1)", '💿 Song Title: Classic\n🎤 Artist: MKTO\n📍: (5,1)', '💿 Song Title: Death of a Bachelor\n🎤 Artist: Panic! At The Disco\n📍: (5,1)', '💿 Song Title: Please Please Please\n🎤 Artist: Sabrina Carpenter\n📍: (5,1)', '💿 Song Title: Numb Little Bug\n🎤 Artist: Em Beihold\n📍: (5,1)', '💿 Song Title: La Da Dee\n🎤 Artist: Cody Simpson\n📍: (5,1)', '💿 Song Title: Checklist (feat. Chromeo)\n🎤 Artist: MAX\n📍: (5,1)', '💿 Song Title: Anti-Hero\n🎤 Artist: Taylor Swift\n📍: (5,1)', '💿 Song Title: Nobody Knows\n🎤 Artist: The Lumineers\n📍: (5,1)', '💿 Song Title: Sweater Weather\n🎤 Artist: The Neighbourhood\n📍: (5,1)', '💿 Song Title: Riptide\n🎤 Artist: Vance Joy\n📍: (5,1)', '💿 Song Title: Walking On A Dream\n🎤 Artist: Empire of The Sun\n📍: (5,1)', '💿 Song Title: Put Your Records On\n🎤 Artist: Corinne Bailey Rae\n📍: (5,2)', '💿 Song Title: Dog Days Are Over\n🎤 Artist: Florence + the Machine\n📍: (5,1)', '💿 Song Title: Family Business\n🎤 Artist: Lawrence\n📍: (5,1)', "💿 Song Title: Human\n🎤 Artist: Rag'n'Bone Man\n📍: (5,1)", '💿  Song Title: Budapest\n🎤 Artist: George Ezra\n📍: (5,1)', '💿 Song Title: Too Sweet\n🎤 Artist: Hozier\n💿:: (5,1)', '💿 Song Title: Good Luck, Babe!\n🎤 Artist: Chappell Roan\n📍: (5,1)', '💿 Song Title: BIRDS OF A FEATHER\n🎤 Artist: Billie Eilish\n📍: (5,1)', '💿 Song Title: Man! I Feel Like A Woman!\n🎤 Artist: Shania Twain\n📍: (3,1)', '💿 Song Title: Good Morning\n🎤 Artist: Lady Gaga\n📍: (3,1)', '💿 Song Title: What Makes You Beautiful\n🎤 Artist: One Direction\n📍: (3,1)', '💿 Song Title: The Lighthouse\n🎤 Artist: Stevie Nicks\n📍: (3,1)', '💿 Song Title: Ego\n🎤 Artist: Halsey\n📍: (3,1)', '💿 Song Title: Maria Maria\n🎤 Artist: Santana & The Product G&B\n📍: (3,1)', '💿 Song Title: Pretty Lies\n🎤 Artist: Bazzi\n📍: (3,1)', '💿  Song Title: Intentions\n🎤 Artist: Justin Bieber\n📍: (3,1)', '💿 Song Title: Pair Of Boots\n🎤 Artist: Luke Bryan\n📍: (3,1)', '💿 Song Title: The Weather (Acoustic & Gospel Reprise)\n🎤 Artist: Lawrence\n📍: (3,1)', '💿 Song Title: Blow for Blow\n🎤 Artist: Tee Grizzley & J. Cole\n📍: (3,1)', '💿 Song Title: Cheerleader\n🎤 Artist: OMI\n📍: (3,1)', '💿 Song Title: Playing God\n🎤 Artist: Polyphia\n📍: (3,1)', '💿 Song Title: Blue Sky & The Painter\n🎤 Artist: Bastille\n📍: (3,1)', '💿 Song Title: Lioness\n🎤 Artist: Swedish House Mafia\n📍: (3,1)', '💿 Song Title: Genie In A Bottle\n🎤 Artist: Christina Aguilera\n📍: (3,1)', '💿 Song Title: Sucker\n🎤 Artist: Jonas Brothers\n📍: (3,1)', '💿 Song Title: Nosey\n🎤 Artist: DDG & G Herbo\n📍: (3,1)', '💿 Song Title: Want To Want Me\n🎤 Artist: Jason Derulo\n📍: (3,1)', '💿 Song Title: Levels\n💿  Artist: Nick Jonas\n📍: (3,1)', '💿 Song Title: Gooey\n🎤 Artist: Glass Animals\n📍: (3,1)', '💿 Song Title: Afters\n🎤 Artist: Elderbrook\n📍: (3,1)', '💿 Song Title: Everybody\n🎤 Artist: Spencer Sutherland\n📍: (3,1)', '💿 Song Title: Beautiful\n🎤 Artist: Bazzi & Camila Cabello\n📍: (3,1)', '💿 Song Title: Lights Camera Action\n🎤 Artist: Kylie Minogue\n📍: (3,1)', '💿 Song Title: Smokin Out The Window\n🎤 Artist: Bruno Mars, Anderson .Paak, Silk Sonic\n📍: (3,1)', '💿 Song Title: deadrose\n🎤 Artist: Unprocessed\n📍: (3,1)', '💿 Song Title: Forever\n🎤 Artist: Chris Brown\n📍: (3,1)', '💿 Song Title: 1, 2 Step\n🎤 Artist: Ciara & Missy Elliott\n📍: (3,1)', '💿 Song Title: Marry You\n🎤 Artist: Bruno Mars\n📍: (4,1)', "💿 Song Title: C'Mon\n🎤 Artist: Kesha\n📍: (4,1)", '💿 Song Title: One Time\n🎤 Artist: Justin Bieber\n📍: (4,1)', '💿 Song Title: Time of Our Lives\n🎤 Artist: Ne-Yo & Pitbull\n📍: (4,1)', "💿 Song Title: You're Hired (feat. Ayra Starr)\n🎤 Artist: NEIKED & Ayra Starr\n📍: (4,1)", '💿 Song Title: Girls Like You\n🎤 Artist: Maroon 5 & Cardi B\n📍: (4,1)', '💿 Song Title: Magic (feat. Rivers Cuomo)\n🎤 Artist: B.o.B and Rivers Cuomo\n📍: (4,1)', '💿 Song Title: As Long As You Love Me\n🎤 Artist: Justin Bieber\n📍: (4,1)', '💿 Song Title: Money Make Her Smile\n🎤 Artist: Bruno Mars\n📍: (4,1)', '💿 Song Title: Replay\n🎤 Artist: Iyaz\n📍: (4,2)', '💿  Song Title: You Da One\n🎤 Artist: Rihanna\n📍: (4,1)', "💿 Song Title: Don't Wanna Know\n🎤 Artist: Maroon 5 & Kendrick Lamar\n📍: (4,1)", '💿 Song Title: The Other Side\n🎤 Artist: Bruno Mars, CeeLo Green, B.o.B\n📍: (4,2)', '💿 Song Title: One Last Time\n🎤 Artist: Ariana Grande\n📍: (4,1)', '💿 Song Title: Troublemaker\n🎤 Artist: Olly Murs\n📍: (4,1)', '💿 Song Title: Casualty\n🎤 Artist: Lawrence\n📍: (4,1)', '💿 Song Title: Grenade\n🎤 Artist: Bruno Mars\n📍: (4,1)', '💿 Song Title: Payphone\n🎤 Artist: Maroon 5\n📍: (4,1)', "💿 Song Title: i'm confident that i'm insecure\n🎤 Artist: Lawrence\n📍: (4,1)", '💿 Song Title: Good Girls Go Bad\n🎤 Artist: Leighton Meester & Cobra Starship\n📍: (4,1)', '💿 Song Title: Locked out of Heaven\n🎤 Artist: Bruno Mars\n📍: (4,1)', "💿 Song Title: Say You're Just a Friend\n🎤 Artist: Austin Mahone & Flo Rida\n📍: (4,1)", '💿 Song Title: Whatcha Want\n🎤 Artist: Beastie Boys\n📍: (4,1)', '💿 Song Title: What Lovers Do\n🎤 Artist: Maroon 5 & SZA\n📍: (4,1)', '💿 Song Title: 23 (acoustic-ish)\n🎤 Artist: Lawrence\n📍: (4,1)', '💿 Song Title: Finesse\n🎤 Artist: Bruno Mars\n📍: (4.66666666666667,3)', '💿 Song Title: Pocketful of Sunshine\n🎤 Artist: Natasha Bedingfield\n📍: (4,1)', '💿 Song Title: Freckles\n🎤 Artist: Lawrence\n📍: (4,2)', '💿 Song Title: Trumpets\n🎤 Artist: Jason Derulo\n📍: (4,1)', "💿 Song Title: It's Not All About You\n🎤 Artist: Lawrence\n📍: (4,1)", '💿 Song Title: Bright Lights Bigger City\n🎤 Artist: CeeLo Green\n📍: (4,2)', '💿 Song Title: September\n🎤 Artist: Earth, Wind & Fire\n📍: (4,2)', '💿 Song Title: Maps\n🎤 Artist: Maroon 5\n📍: (6,1)', '💿 Song Title: Down\n🎤 Artist: Jay Sean\n📍: (6,1)', '💿 Song Title: Make A Move\n🎤 Artist: Lawrence\n📍: (6,1)', '💿 Song Title: Glamorous\n🎤 Artist: Fergie\n📍: (6,1)', '💿  Song Title: SUPERBLOOM\n🎤 Artist: MisterWives\n📍: (6,1)', '💿 Song Title: No Lie\n🎤 Artist: Sean Paul\n📍: (6,1)', "💿 Song Title: Nothin' on You (feat. Bruno Mars)\n🎤 Artist: B.o.B\n📍: (6,1)", '💿 Song Title: Misery\n🎤 Artist: Maroon 5\n📍: (6,1)', '💿 Song Title: Rocketeer\n🎤 Artist: Far East Movement\n📍: (6,1)', '💿 Song Title: decide to be happy\n🎤 Artist: MisterWives\n📍: (6,1)', '💿 Song Title: We R Who We R\n🎤 Artist: Kesha\n📍: (6,1)', '💿 Song Title: MONEY\n🎤 Artist: LISA\n📍: (6,1)', '💿 Song Title: Guy I Used To Be\n🎤 Artist: Lawrence\n📍: (6,1)', '💿 Song Title: Treasure\n🎤 Artist: Bruno Mars\n📍: (6,1)', '💿  Song Title: Goose\n🎤 Artist: Polyphia\n📍: (5,2)', '💿 Song Title: Ego Death\n🎤 Artist: Polyphia\n📍: (5,2)', '💿 Song Title: Tummy Hurts\n🎤 Artist: Reneé Rapp\n📍: (5,2)', '💿 Song Title: Take A Bow\n🎤 Artist: Rihanna\n📍: (6,1)', '💿 Song Title: Rude\n🎤 Artist: MAGIC!\n📍: (6,1)', '💿 Song Title: Happy Now\n🎤 Artist: Zedd & Elley Duhé\n📍: (6,1)', '💿 Song Title: The Worst\n🎤 Artist: Polyphia\n📍: (5,2)', '💿 Song Title: Saucy\n🎤 Artist: Polyphia\n📍: (4,1)', '💿 Song Title: Loud\n🎤 Artist: Polyphia\n📍: (4,1)', '💿 Song Title: Nightmare\n🎤 Artist: Polyphia\n📍: (4,1)', '💿 Song Title: Racing into the Night\n🎤 Artist: YOASOBI\n📍: (4,1)', "💿 Song Title: Club Nebula\n🎤 Artist: Snail's House\n📍: (4,1)", '💿 Song Title: G.O.A.T.\n🎤 Artist: Polyphia\n📍: (4,1)', '💿 Song Title: Neurotica\n🎤 Artist: Polyphia\n📍: (4,1)', '💿 Song Title: Reverie\n🎤 Artist: Polyphia\n📍: (4,1)', '💿 Song Title: Tango\n🎤 Artist: Abir\n📍: (4,1)', '💿 Song Title: Feels\n🎤 Artist: Calvin Harris & Pharrell Williams & Katy Perry\n📍: (4,1)', '💿 Song Title: Makes Me Wonder\n🎤 Artist: Maroon 5\n📍: (4,1)', '💿 Song Title: Love Never Felt So Good\n🎤 Artist: Michael Jackson & Justin Timberlake\n📍: (4,1)', '💿 Song Title: Work\n🎤 Artist: Fifth Harmony\n📍: (4,1)', '💿 Song Title: Hurricane\n🎤 Artist: Bridgit Mendler\n📍: (4,1)', '💿 Song Title: No Diggity\n🎤 Artist: Blackstreet, Dr.Dre, Queen Pen\n📍: (4,1)']
    

    for (let i = 0; i < 197; i++) {
        const titleValue = title[i];
        const imageValue = image[i];
        const xvalValue = xval[i];
        const yvalValue = yval[i];
        const descValue = desc[i];

        // Call your addRapperCircle function with the extracted values
        addRapperCircle('chart-axis-ticks', imageValue, xvalValue, yvalValue, titleValue, descValue);
}
});
