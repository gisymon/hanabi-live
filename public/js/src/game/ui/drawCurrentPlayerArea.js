// Imports
import Konva from 'konva';
import { LABEL_COLOR, MAX_CLUE_NUM } from '../../constants';
import FitText from './FitText';
import globals from './globals';

export default (winW, winH, clueAreaValues) => {
    // The "Current player: [player name]" box
    const currentPlayerAreaWidth = 0.3; // This is big enough to fit in between the two timers
    const currentPlayerAreaValues = {
        x: clueAreaValues.x + (clueAreaValues.w / 2) - (currentPlayerAreaWidth / 2),
        y: clueAreaValues.y + 0.015,
        w: currentPlayerAreaWidth,
        h: 0.15,
        spacing: 0.006,
    };
    globals.elements.currentPlayerArea = new Konva.Group({
        x: currentPlayerAreaValues.x * winW,
        y: currentPlayerAreaValues.y * winH,
        height: currentPlayerAreaValues.h * winH,
        visible: !globals.replay,
    });
    globals.layers.UI.add(globals.elements.currentPlayerArea);

    let currentPlayerBox1Width = (currentPlayerAreaValues.w * 0.75);
    currentPlayerBox1Width -= currentPlayerAreaValues.spacing;
    globals.elements.currentPlayerRect1 = new Konva.Rect({
        width: currentPlayerBox1Width * winW,
        height: currentPlayerAreaValues.h * winH,
        cornerRadius: 0.01 * winW,
        fill: 'black',
        opacity: 0.2,
    });
    globals.elements.currentPlayerArea.add(globals.elements.currentPlayerRect1);

    const textValues = {
        w: currentPlayerBox1Width - (currentPlayerAreaValues.spacing * 4),
        w2: currentPlayerBox1Width - (currentPlayerAreaValues.spacing * 2),
    };
    textValues.x = (currentPlayerBox1Width / 2) - (textValues.w / 2);
    textValues.x2 = (currentPlayerBox1Width / 2) - (textValues.w2 / 2);

    globals.elements.currentPlayerText1 = new FitText({
        x: textValues.x * winW,
        width: textValues.w * winW,
        fontFamily: 'Verdana',
        fontSize: 0.08 * winH,
        text: 'Current player:',
        align: 'center',
        fill: LABEL_COLOR,
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffset: {
            x: 0,
            y: 0,
        },
        shadowOpacity: 0.9,
    });
    globals.elements.currentPlayerArea.add(globals.elements.currentPlayerText1);

    globals.elements.currentPlayerText2 = new FitText({
        x: textValues.x * winW,
        width: textValues.w * winW,
        fontFamily: 'Verdana',
        fontSize: 0.08 * winH,
        text: '',
        align: 'center',
        fill: '#ffffcc',
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffset: {
            x: 0,
            y: 0,
        },
        shadowOpacity: 0.9,
    });
    globals.elements.currentPlayerArea.add(globals.elements.currentPlayerText2);
    globals.elements.currentPlayerText2.setPlayer = function setPlayer(
        currentPlayerIndex,
        threeLines,
    ) {
        this.fitText(globals.playerNames[currentPlayerIndex] || 'Undefined');
        let maxSize = (currentPlayerAreaValues.h / 3) * winH;
        if (threeLines) {
            maxSize = (currentPlayerAreaValues.h / 4) * winH;
        }
        this.width(textValues.w * winW);
        this.resize();
        while (this.measureSize(this.text()).height > maxSize) {
            this.width(this.width() * 0.9);
            this.resize();
        }
        this.x((globals.elements.currentPlayerRect1.width() / 2) - (this.width() / 2));
    };

    globals.elements.currentPlayerText3 = new FitText({
        x: textValues.x2 * winW,
        width: textValues.w2 * winW,
        fontFamily: 'Verdana',
        fontSize: 0.08 * winH,
        text: '',
        align: 'center',
        fill: 'red',
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffset: {
            x: 0,
            y: 0,
        },
        shadowOpacity: 0.9,
        visible: false,
    });
    globals.elements.currentPlayerArea.add(globals.elements.currentPlayerText3);

    const arrowValues = {
        x: (currentPlayerAreaValues.w * 0.75) + currentPlayerAreaValues.spacing,
        w: (currentPlayerAreaValues.w * 0.25) - currentPlayerAreaValues.spacing,
        h: currentPlayerAreaValues.h,
        spacing: 0.01,
    };
    const rect2 = new Konva.Rect({
        x: arrowValues.x * winW,
        width: arrowValues.w * winW,
        height: currentPlayerAreaValues.h * winH,
        cornerRadius: 0.01 * winW,
        fill: 'black',
        opacity: 0.2,
    });
    globals.elements.currentPlayerArea.add(rect2);

    globals.elements.currentPlayerArrow = new Konva.Group({
        x: (arrowValues.x + (arrowValues.w / 2)) * winW,
        y: (currentPlayerAreaValues.h / 2) * winH,
        offset: {
            x: (arrowValues.w / 2) * winW,
            y: (currentPlayerAreaValues.h / 2) * winH,
        },
    });
    globals.elements.currentPlayerArea.add(globals.elements.currentPlayerArrow);

    const arrowBorder = new Konva.Arrow({
        points: [
            arrowValues.spacing * winW,
            (arrowValues.h / 2) * winH,
            (arrowValues.w - arrowValues.spacing) * winW,
            (arrowValues.h / 2) * winH,
        ],
        pointerLength: 10,
        pointerWidth: 10,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 10,
        shadowBlur: 75,
        shadowOpacity: 1,
    });
    globals.elements.currentPlayerArrow.add(arrowBorder);

    const arrowBorderEdge = new Konva.Line({
        points: [
            (arrowValues.spacing) * winW,
            ((arrowValues.h / 2) - 0.005) * winH,
            (arrowValues.spacing) * winW,
            ((arrowValues.h / 2) + 0.005) * winH,
        ],
        fill: 'black',
        stroke: 'black',
        strokeWidth: 5,
    });
    globals.elements.currentPlayerArrow.add(arrowBorderEdge);

    const arrowMain = new Konva.Arrow({
        points: [
            arrowValues.spacing * winW,
            (arrowValues.h / 2) * winH,
            (arrowValues.w - arrowValues.spacing) * winW,
            (arrowValues.h / 2) * winH,
        ],
        pointerLength: 10,
        pointerWidth: 10,
        fill: LABEL_COLOR,
        stroke: LABEL_COLOR,
        strokeWidth: 5,
    });
    globals.elements.currentPlayerArrow.add(arrowMain);

    // Set the "Current Player" area up for this specific turn
    globals.elements.currentPlayerArea.update = function update(currentPlayerIndex) {
        this.visible(
            // Don't show it if we are in a solo/shared replay
            // or if we happen to have the in-game replay open
            !globals.inReplay
            // Don't show it if the clue UI is there
            && (!globals.ourTurn || globals.clues === 0)
            // Don't show it if the premove button is there
            && !globals.elements.premoveCancelButton.visible()
            && currentPlayerIndex !== -1, // Don't show it if this is the end of the game
        );

        if (currentPlayerIndex === -1) {
            // The game has ended
            return;
        }

        // Update the text
        const text1 = globals.elements.currentPlayerText1;
        const text2 = globals.elements.currentPlayerText2;
        const text3 = globals.elements.currentPlayerText3;
        let specialText = '';
        if (!globals.lobby.settings.get('realLifeMode')) {
            if (globals.clues === 0) {
                specialText = '(cannot clue; 0 clues left)';
                text3.fill('red');
            } else if (globals.clues === MAX_CLUE_NUM) {
                specialText = `(cannot discard; at ${MAX_CLUE_NUM} clues)`;
                text3.fill('red');
            } else if (globals.elements.playerHands[currentPlayerIndex].isLocked()) {
                specialText = '(locked; may not be able to discard)';
                text3.fill('yellow');
            } else if (globals.elements.noDoubleDiscardBorder.visible()) {
                specialText = '(potentially in a "Double Discard" situation)';
                text3.fill('yellow');
            }
        }
        const totalH = this.height();
        const text1H = text1.measureSize(text1.text()).height;
        if (specialText === '') {
            // 2 lines
            text2.setPlayer(currentPlayerIndex, false);
            const text2H = text2.measureSize(text2.text()).height;
            const spacing = 0.03 * globals.stage.height();
            text1.y((totalH / 2) - (text1H / 2) - spacing);
            text2.y((totalH / 2) - (text2H / 2) + spacing);
            text3.hide();
        } else {
            // 3 lines
            text2.setPlayer(currentPlayerIndex, true);
            const text2H = text2.measureSize(text2.text()).height;
            const spacing = 0.04 * globals.stage.height();
            text1.y((totalH / 2) - (text1H / 2) - spacing);
            text2.y((totalH / 2) - (text2H / 2) + (spacing * 0.25));
            text3.y((totalH / 2) - (text1H / 2) + (spacing * 1.5));
            text3.fitText(specialText);
            text3.show();
        }

        // Make the arrow point to the current player
        const centerPos = globals.elements.playerHands[currentPlayerIndex].getAbsoluteCenterPos();
        const thisPos = globals.elements.currentPlayerArrow.absolutePosition();
        const x = centerPos.x - thisPos.x;
        const y = centerPos.y - thisPos.y;
        const radians = Math.atan(y / x);
        let rotation = radians * (180 / Math.PI);
        if (x < 0) {
            rotation += 180;
        }

        if (globals.animateFast) {
            globals.elements.currentPlayerArrow.rotation(rotation);
        } else {
            if (globals.elements.currentPlayerArrowTween) {
                globals.elements.currentPlayerArrowTween.destroy();
            }

            // We want the arrow to always be moving clockwise
            const oldRotation = globals.elements.currentPlayerArrow.rotation();
            const unmodifiedRotation = rotation;
            if (oldRotation > rotation) {
                rotation += 360;
            }

            globals.elements.currentPlayerArrowTween = new Konva.Tween({
                node: globals.elements.currentPlayerArrow,
                duration: 0.75,
                rotation,
                easing: Konva.Easings.EaseInOut,
                onFinish: () => {
                    if (globals.elements.currentPlayerArrow) {
                        globals.elements.currentPlayerArrow.rotation(unmodifiedRotation);
                    }
                },
            }).play();
        }
    };
};
