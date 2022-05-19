const   mongoose = require("mongoose"),
        Movie = require("./models/movie"),
        Comment = require("./models/comment");

const data = [
    {
        title: "Pompo The Cinephile",
        genre: "Animation",
        length: "90",
        director: "Kenneth Branagh",
        releaseDate: 31-05-2022,
        description: 'The series centers on Joelle Davidovich Pomponette (Pompo-san), a talented film producer at the movie capital "Nyallywood." Despite her prowess to see through to the potential of actors and staff and bring out their talent to the fullest, she has only been producing B-class action and erotic films. One day, Pompo\'s "film-worm" assistant Gene, who has been doubtful of her choices of film genres, is given the task to direct a film based on a script written by her. Will Gene be able to bring Pompo\'s "masterpiece" to fruition?',
        image: "/pic/movie1.jpg",
        trailer: "/pic/trailer.jpg"
    },
    {
        title: "Detective Conan The Movie 25",
        genre: "Animation",
        length: "111",
        director: "Susumu Mitsunaka",
        releaseDate: 32-05-2022,
        description: 'Shibuya, Tokyo, is bustling with the Halloween season. A wedding is being held at Shibuya Hikarie, where Miwako Sato is dressed in a wedding dress. While Conan and the other invited guests are watching, an assailant suddenly bursts in, and Wataru Takagi, who was trying to protect Sato, is injured. Takagi survived and the situation was settled, but in Sato\'s eyes, the image of the grim reaper that she had seen when Jinpei Matsuda, the man she had been in love with, had been killed in a series of bombings three years ago, overlapped with Takagi\'s. At the same time, the perpetrator of the bombings escapes from prison. Is this really a coincidence? Rei Furuya/Toru Amuro, a member of the public safety police, is hunting down the man who killed his classmate, but a mysterious person in disguise suddenly appears and puts a collar bomb on him. Conan visits the underground shelter where Amuro is hiding out to disarm the collar bomb, and hears about an incident three years ago when he and his now deceased classmates from the police academy encountered an unidentified virtual bomber named "Plamya" in Shibuya. As Conan and his team investigate, a disturbing shadow begins to loom over them.',
        image: "/pic/movie19.jpg",
        trailer: "/pic/trailer.jpg"
    }
];
function seedDB(){
    Movie.remove({},function(err){
        if(err){
            console.log(err);
        } else{
            console.log('Data removal complete');
            data.forEach(function(seed){
                Movie.create(seed, function(err, movie){
                    if(err){
                        console.log(err);
                    } else{
                        console.log('New data added!');
                        Comment.create({
                            author: 'Ken',
                            text: 'It\'s fun!!!'
                        }, function(err, comment){
                            if(err){
                                console.log(err)
                            } else{
                                movie.comments.push(comment);
                                movie.save();
                            }
                        });
                    }
                });
            })
        }
    });
}

module.exports = seedDB;