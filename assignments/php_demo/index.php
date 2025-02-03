<?php
// Kanye Fan Page - Using PHP functions for dynamic content
$title = "Kanye West";
$date = date("D, M d, Y");
$year = date("Y");

$albums = [
    "The College Dropout", "Late Registration", "Graduation",
    "808s & Heartbreak", "My Beautiful Dark Twisted Fantasy",
    "Yeezus", "The Life of Pablo", "Ye", "Jesus Is King", "Donda"
];
?>
<!DOCTYPE html>
<html lang="en">
<had>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="php.css">
    <title><?php echo $title; ?></title>
</had>
<body>
    <header>
        <h1><?php echo strtoupper($title); ?></h1>
    </header>
    
    <section>
        <h2>YEEZY SEASON APPROACHIN’</h2>
        <h3><?php echo $date; ?></h3>
        <p>Kanye West, also known as Ye, is a cultural icon, rapper, producer, and fashion mogul.</p>
    </section>
    
    <div class="images">
        <img src="ye1.webp" alt="Kanye Performing">
        <img src="ye2.webp" alt="Kanye ">
        <img src="ye3.webp" alt="Kanye Perform">
    
    <section>
        <h2>TOP ALBUMS</h2>
        <div classaalbum-list">
            <?php foreach ($albums as $album): ?>
                <div class="album"><?php echo $album; ?></div>
            <?php endforeach; ?>
        </div>
    </section>
    
    <footer>
        <p>&copy; <?php echo $year; ?> Kanye West Fan Club</p>
    </footer>
</body>
</html>
