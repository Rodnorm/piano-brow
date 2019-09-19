import React, { useRef, useEffect } from 'react';
import './scale.component.scss';
import scaleNotes from './scale.constants';


function Scale(props) {

    const scaleHtml = [
        {
            id: 'C-a',
            src: scaleNotes.firstC,
            className: 'scale__white-keys',
            hasChild: true,
            child: {
                id: 'C#-w',
                src: scaleNotes.firstCSharp,
                className: 'scale__black-keys',
            }
        },
        {
            id: 'D-s',
            src: scaleNotes.firstD,
            className: 'scale__white-keys',
            hasChild: true,
            child: {
                id: 'D#-e',
                src: scaleNotes.firstDSharp,
                className: 'scale__black-keys',
            }
        },
        {
            id: 'E-d',
            src: scaleNotes.firstE,
            className: 'scale__white-keys',
            hasChild: false,
        },
        {
            id: 'F-f',
            src: scaleNotes.firstF,
            className: 'scale__white-keys',
            hasChild: true,
            child: {
                id: 'C#-t',
                src: scaleNotes.firstFSharp,
                className: 'scale__black-keys',
            }
        },
        {
            id: 'G-g',
            src: scaleNotes.firstG,
            className: 'scale__white-keys',
            hasChild: true,
            child: {
                id: 'G#-y',
                src: scaleNotes.firstGSharp,
                className: 'scale__black-keys',
            }
        },
        {
            id: 'A-h',
            src: scaleNotes.firstA,
            className: 'scale__white-keys',
            hasChild: true,
            child: {
                id: 'A#-u',
                src: scaleNotes.firstASharp,
                className: 'scale__black-keys',
            }
        },
        {
            id: 'B-j',
            src: scaleNotes.firstB,
            className: 'scale__white-keys',
            hasChild: false
        },
        // {
        //     id: 'C2-b',
        //     src: scaleNotes.secondC,
        //     className: 'scale__white-keys',
        //     hasChild: true,
        //     child: {
        //         id: 'C2#-u',
        //         src: scaleNotes.secondCSharp,
        //         className: 'scale__black-keys',
        //     }
        // },
        // {
        //     id: 'D2-n',
        //     src: scaleNotes.secondD,
        //     className: 'scale__white-keys',
        //     hasChild: true,
        //     child: {
        //         id: 'D2#-i',
        //         src: scaleNotes.secondDSharp,
        //         className: 'scale__black-keys',
        //     }
        // },
        // {
        //     id: 'E2-m',
        //     src: scaleNotes.secondE,
        //     className: 'scale__white-keys',
        //     hasChild: false,
        // },
        // {
        //     id: 'F2-,',
        //     src: scaleNotes.secondF,
        //     className: 'scale__white-keys',
        //     hasChild: true,
        //     child: {
        //         id: 'F2#-o',
        //         src: scaleNotes.secondFSharp,
        //         className: 'scale__black-keys',
        //     }
        // },
        // {
        //     id: 'G2-.',
        //     src: scaleNotes.secondG,
        //     className: 'scale__white-keys',
        //     hasChild: true,
        //     child: {
        //         id: 'G2#-p',
        //         src: scaleNotes.secondGSharp,
        //         className: 'scale__black-keys',
        //     }
        // },
        // {
        //     id: 'A2-;',
        //     src: scaleNotes.secondA,
        //     className: 'scale__white-keys',
        //     hasChild: true,
        //     child: {
        //         id: 'A2#-/',
        //         src: scaleNotes.secondASharp,
        //         className: 'scale__black-keys',
        //     }
        // },
        // {
        //     id: 'A2-enter',
        //     src: scaleNotes.secondB,
        //     className: 'scale__white-keys',
        //     hasChild: false,
        // },
    ];

    let scale = useRef(null);

    const play = (e, releaseMe) => {
        for (let i = 0; i < scale.current.children.length; i++ ) {
            if (scale.current.children[i].id.split('-')[1] === e.key) {
                if (releaseMe) {
                    scale.current.children[i].children[0] && handleAudio(scale.current.children[i].children[0], true)
                } else {
                    scale.current.children[i].children[0] && handleAudio(scale.current.children[i].children[0]);
                }
            } else if (scale.current.children[i].children[1] && scale.current.children[i].children[1].id.split('-')[1] === e.key) {
                if (releaseMe) {
                    handleAudio(scale.current.children[i].children[1].children[0], true, true);
                } else {
                    handleAudio(scale.current.children[i].children[1].children[0], false, true);
                }
            }
        }
        console.log('-->', scale);
    }

    const handleAudio = (element, pause, blackKeys) => {
        if (pause) {
            element.load();
            blackKeys ? element.parentElement.classList.remove('scale__black-keys-pressed') : element.parentElement.classList.remove('scale__white-keys-pressed');
        } else {
            element.play();
            blackKeys ? element.parentElement.classList.add('scale__black-keys-pressed') : element.parentElement.classList.add('scale__white-keys-pressed');
        }
    }

    const releaseNote = (e) => {
        play(e, true);
    }

    useEffect(() =>  {
        document.addEventListener('keydown', play);
        document.addEventListener('keyup', releaseNote);
    });
    
    return (
            <div className="scale" ref={scale}>
                {scaleHtml.map(element => (
                    <div id={element.id} className={element.className} key={element.id}>
                        <audio src={element.src} type="audio/mpeg"></audio>
                        {element.hasChild && (
                            <div id={element.child.id} className={element.child.className}>
                                <audio>
                                    <source src={element.child.src} type="audio/mpeg" />
                                </audio>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )
}

export default Scale;
