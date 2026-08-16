// ============================================================
// CHARACTER SHEET SCRIPT
// ============================================================

console.log("script.js is working!");

document.addEventListener("DOMContentLoaded", function () {

    // ========================================================
    // GET HTML ELEMENTS
    // ========================================================

    const physiqueField =
        document.getElementById("physique");

    const heightField =
        document.getElementById("height");

    const skillField =
        document.getElementById("skills");

    const stealthField =
        document.getElementById("stealth");

    const mobilityField =
        document.getElementById("mobility");

    const enduranceField =
        document.getElementById("endurance");

    const recoveryField =
        document.getElementById("recovery");

    const fortitudeField =
        document.getElementById("fortitude");

    const mightField =
        document.getElementById("might");

    const paddingField =
        document.getElementById("padding");

    const reachField =
        document.getElementById("reach");

    const grapplingField =
        document.getElementById("grappling");

    const weightField =
        document.getElementById("weight");

    const weightBaseField =
        document.getElementById("weightBase");

    const weightEIndicatorField =
        document.getElementById("weightEIndicator");

    const movementField =
        document.getElementById("movement");

    const fatigueField =
        document.getElementById("fatigue");

    const priorityField =
        document.getElementById("priority");

    const priorityPenaltyField =
        document.getElementById("priorityPenalty");

    const injurySelect =
        document.getElementById("injurySelect");

    const injuryTokens =
        document.getElementById("injuryTokens");


    // ========================================================
    // PHYSIQUE DATA
    // ========================================================

    const physiqueData = {

        Massive: {
            Might: 4,
            Padding: 3,
            Fortitude: 3,
            Recovery: "d4",
            WeightBase: 20,
            Endurance: 5,
            Mobility: 0,
            Stealth: -1
        },

        Huge: {
            Might: 3,
            Padding: 3,
            Fortitude: 3,
            Recovery: "d6",
            WeightBase: 19,
            Endurance: 6,
            Mobility: 0,
            Stealth: 0
        },

        Bulky: {
            Might: 3,
            Padding: 2,
            Fortitude: 2,
            Recovery: "d6",
            WeightBase: 18,
            Endurance: 6,
            Mobility: 1,
            Stealth: 1
        },

        Muscular: {
            Might: 2,
            Padding: 2,
            Fortitude: 2,
            Recovery: "d8",
            WeightBase: 17,
            Endurance: 7,
            Mobility: 1,
            Stealth: 2
        },

        Athletic: {
            Might: 2,
            Padding: 1,
            Fortitude: 2,
            Recovery: "d8",
            WeightBase: 16,
            Endurance: 7,
            Mobility: 2,
            Stealth: 2
        },

        Average: {
            Might: 1,
            Padding: 1,
            Fortitude: 2,
            Recovery: "d8",
            WeightBase: 15,
            Endurance: 8,
            Mobility: 2,
            Stealth: 2
        },

        Toned: {
            Might: 1,
            Padding: 0,
            Fortitude: 2,
            Recovery: "d8",
            WeightBase: 14,
            Endurance: 8,
            Mobility: 3,
            Stealth: 2
        },

        Lean: {
            Might: 0,
            Padding: 0,
            Fortitude: 2,
            Recovery: "d8",
            WeightBase: 13,
            Endurance: 8,
            Mobility: 3,
            Stealth: 3
        },

        Slender: {
            Might: 0,
            Padding: 0,
            Fortitude: 2,
            Recovery: "d10",
            WeightBase: 12,
            Endurance: 8,
            Mobility: 4,
            Stealth: 3
        },

        Small: {
            Might: 0,
            Padding: 0,
            Fortitude: 1,
            Recovery: "d10",
            WeightBase: 11,
            Endurance: 9,
            Mobility: 4,
            Stealth: 4
        },

        Meek: {
            Might: -1,
            Padding: 0,
            Fortitude: 1,
            Recovery: "d12",
            WeightBase: 10,
            Endurance: 10,
            Mobility: 5,
            Stealth: 5
        }

    };


    // ========================================================
    // HEIGHT DATA
    // ========================================================

    const heightData = {

        Tall: {
            Reach: 2,
            GrapplingBase: 0
        },

        Average: {
            Reach: 1,
            GrapplingBase: 1
        },

        Short: {
            Reach: 0,
            GrapplingBase: 2
        }

    };


    // ========================================================
    // CHARACTER VALUES
    // ========================================================

    let character = {

        Might: "",
        Padding: "",
        Fortitude: "",
        Recovery: "",
        WeightBase: "",
        Endurance: "",
        Mobility: "",
        Stealth: "",

        Reach: "",
        GrapplingBase: "",
        Grappling: "",

        Weight: "",
        Movement: "",
        WeightEIndicator: ""

    };


    // ========================================================
    // DEFAULT VALUES
    // ========================================================

    fatigueField.value = "0";
    priorityField.value = "0";


    // ========================================================
    // INJURY LIST
    // ========================================================

    let injuries = [];


    // ========================================================
    // INJURY TRACKER TYPES
    // ========================================================
    //
    // These injuries receive a numerical tracker.
    //
    // Minimum = 1
    // Maximum = 3
    //
    // Wounds, Bruise, and Bleeding do NOT receive trackers.
    // ========================================================

    const trackedInjuries = new Set([

        "head-injury",
        "left-arm-injury",
        "right-arm-injury",
        "leg-injury",
        "torso-injury"

    ]);


    // ========================================================
    // IMAGE PATHS
    // ========================================================

    const injuryImages = {

        "bleeding":
            "injuries/Bleeding.png",

        "bruise":
            "injuries/Bruise.png",

        "head-injury":
            "injuries/Head Injury.png",

        "head-wound":
            "injuries/Head Wound.png",

        "left-arm-injury":
            "injuries/Left Arm Injury.png",

        "left-arm-wound":
            "injuries/Left Arm Wound.png",

        "leg-injury":
            "injuries/Leg Injury.png",

        "leg-wound":
            "injuries/Leg Wound.png",

        "right-arm-injury":
            "injuries/Right Arm Injury.png",

        "right-arm-wound":
            "injuries/Right Arm Wound.png",

        "torso-injury":
            "injuries/Torso Injury.png",

        "torso-wound":
            "injuries/Torso Wound.png"

    };


    // ========================================================
    // UPDATE PHYSIQUE
    // ========================================================

    function updatePhysique() {

        const selectedPhysique =
            physiqueField.value;

        const data =
            physiqueData[selectedPhysique];

        if (!data) {
            return;
        }


        // ----------------------------------------------------
        // HEIGHT RESTRICTIONS
        // ----------------------------------------------------

        if (
            selectedPhysique === "Massive" ||
            selectedPhysique === "Huge"
        ) {

            heightField.value = "Tall";
            heightField.disabled = true;

        }

        else if (
            selectedPhysique === "Small" ||
            selectedPhysique === "Meek"
        ) {

            heightField.value = "Short";
            heightField.disabled = true;

        }

        else {

            heightField.disabled = false;

        }


        // ----------------------------------------------------
        // PHYSIQUE VALUES
        // ----------------------------------------------------

        character.Might =
            data.Might;

        character.Padding =
            data.Padding;

        character.Fortitude =
            data.Fortitude;

        character.Recovery =
            data.Recovery;

        character.WeightBase =
            data.WeightBase;

        character.Endurance =
            data.Endurance;

        character.Mobility =
            data.Mobility;

        character.Stealth =
            data.Stealth;


        // ----------------------------------------------------
        // RESET WEIGHT
        // ----------------------------------------------------

        character.Weight =
            data.WeightBase;

        weightField.value =
            data.WeightBase;


        // ----------------------------------------------------
        // DISPLAY VALUES
        // ----------------------------------------------------

        mightField.value =
            data.Might;

        paddingField.value =
            data.Padding;

        stealthField.value =
            data.Stealth;

        mobilityField.value =
            data.Mobility;

        enduranceField.value =
            data.Endurance;

        recoveryField.value =
            data.Recovery;

        fortitudeField.value =
            data.Fortitude;

        weightBaseField.value =
            data.WeightBase;


        // ----------------------------------------------------
        // UPDATE CALCULATIONS
        // ----------------------------------------------------

        updateHeight();
        updateAllStats();

    }


    // ========================================================
    // UPDATE HEIGHT
    // ========================================================

    function updateHeight() {

        const selectedHeight =
            heightField.value;

        const data =
            heightData[selectedHeight];

        if (!data) {
            return;
        }

        character.Reach =
            data.Reach;

        character.GrapplingBase =
            data.GrapplingBase;

        reachField.value =
            data.Reach;

        updateGrappling();

    }


    // ========================================================
    // UPDATE GRAPPLING
    // ========================================================

    function updateGrappling() {

        const might =
            Number(character.Might);

        const baseGrappling =
            Number(character.GrapplingBase);

        if (
            !isNaN(might) &&
            !isNaN(baseGrappling)
        ) {

            character.Grappling =
                might + baseGrappling;

            grapplingField.value =
                character.Grappling;

        }

        else {

            character.Grappling =
                "";

            grapplingField.value =
                "";

        }

    }


    // ========================================================
    // GET HIGHEST SKILL LEVEL
    // ========================================================
    //
    // Only ALL-CAPS skill names are recognized.
    //
    // Examples:
    //
    // SNEAKY              = +1
    // SNEAKY 2            = +2
    // SNEAKY 2 SNEAKY 5  = +5
    // SNEAKY 3 SNEAKY 2  = +3
    // sneaky 5            = ignored
    //
    // Duplicate versions never stack.
    // ========================================================

    function getSkillLevel(
        skillText,
        skillName
    ) {

        const regex =
            new RegExp(
                "\\b" +
                skillName +
                "(?:\\s+(\\d+))?\\b",
                "g"
            );

        let highest = 0;

        let match;

        while (
            (match = regex.exec(skillText)) !== null
        ) {

            const level =
                match[1]
                    ? Number(match[1])
                    : 1;

            highest =
                Math.max(
                    highest,
                    level
                );

        }

        return highest;

    }


    // ========================================================
    // GET SKILL MODIFIERS
    // ========================================================

    function getSkillModifiers() {

        const skillText =
            skillField
                ? skillField.value
                : "";


        const modifiers = {

            Mobility: 0,
            Fortitude: 0,
            Stealth: 0,
            Might: 0,
            Endurance: 0,
            Padding: 0,
            Grappling: 0,
            Movement: 0

        };


        // ----------------------------------------------------
        // FLEXIBLE
        // Mobility +1
        // ----------------------------------------------------

        if (
            skillText.includes("FLEXIBLE")
        ) {

            modifiers.Mobility = 1;

        }


        // ----------------------------------------------------
        // RESILIENT
        // Fortitude +1
        // ----------------------------------------------------

        if (
            skillText.includes("RESILIENT")
        ) {

            modifiers.Fortitude = 1;

        }


        // ----------------------------------------------------
        // SNEAKY
        // Highest numbered version wins
        // ----------------------------------------------------

        modifiers.Stealth =
            getSkillLevel(
                skillText,
                "SNEAKY"
            );


        // ----------------------------------------------------
        // STRONG
        // Might +1
        // ----------------------------------------------------

        if (
            skillText.includes("STRONG")
        ) {

            modifiers.Might = 1;

        }


        // ----------------------------------------------------
        // TIRELESS
        // Highest numbered version wins
        // ----------------------------------------------------

        modifiers.Endurance =
            getSkillLevel(
                skillText,
                "TIRELESS"
            );


        // ----------------------------------------------------
        // TOUGH
        // Padding +1
        // ----------------------------------------------------

        if (
            skillText.includes("TOUGH")
        ) {

            modifiers.Padding = 1;

        }


        // ----------------------------------------------------
        // ABRAZARE
        // Grappling +1
        // ----------------------------------------------------

        if (
            skillText.includes("ABRAZARE")
        ) {

            modifiers.Grappling = 1;

        }


        // ----------------------------------------------------
        // UNARMORED
        //
        // Mobility +5
        // Movement +10
        // ----------------------------------------------------

        if (
            skillText.includes("UNARMORED")
        ) {

            modifiers.Mobility = 5;
            modifiers.Movement = 10;

        }


        return modifiers;

    }


    // ========================================================
    // COUNT LEG INJURIES / WOUNDS
    // ========================================================

    function getLegInjuryCount() {

        return injuries.filter(
            injury =>
                injury.type === "leg-injury"
        ).length;

    }


    function getLegWoundCount() {

        return injuries.filter(
            injury =>
                injury.type === "leg-wound"
        ).length;

    }


    // ========================================================
    // UPDATE ALL INJURY / SKILL EFFECTS
    // ========================================================

    function updateInjuryEffects() {

        const legInjuries =
            getLegInjuryCount();

        const legWounds =
            getLegWoundCount();


        // ----------------------------------------------------
        // GET SKILL MODIFIERS
        // ----------------------------------------------------

        const skills =
            getSkillModifiers();


        // ----------------------------------------------------
        // START WITH PHYSIQUE VALUES
        // ----------------------------------------------------

        let might =
            character.Might;

        let padding =
            character.Padding;

        let fortitude =
            character.Fortitude;

        let endurance =
            character.Endurance;

        let mobility =
            character.Mobility;

        let stealth =
            character.Stealth;


        // ----------------------------------------------------
        // APPLY STRONG
        // ----------------------------------------------------
        //
        // STRONG can raise Might to 3.
        //
        // If the character already has Might 4
        // naturally (Massive), it remains 4.
        // ----------------------------------------------------

        if (
            skills.Might > 0
        ) {

            if (
                character.Might < 3
            ) {

                might =
                    Math.min(
                        character.Might +
                        skills.Might,
                        3
                    );

            }

            else {

                might =
                    character.Might;

            }

        }


        // ----------------------------------------------------
        // APPLY OTHER SKILLS
        // ----------------------------------------------------

        padding +=
            skills.Padding;

        fortitude +=
            skills.Fortitude;

        endurance +=
            skills.Endurance;

        mobility +=
            skills.Mobility;

        stealth +=
            skills.Stealth;


        // ----------------------------------------------------
        // APPLY STAT MAXIMUMS
        // ----------------------------------------------------
        //
        // Might:
        // 3 is the normal skill maximum.
        // Massive's natural 4 is preserved.
        // ----------------------------------------------------

        if (
            character.Might < 4
        ) {

            might =
                Math.min(
                    might,
                    3
                );

        }

        else {

            might =
                character.Might;

        }


        padding =
            Math.min(
                padding,
                3
            );

        fortitude =
            Math.min(
                fortitude,
                3
            );

        endurance =
            Math.min(
                endurance,
                10
            );

        mobility =
            Math.min(
                mobility,
                5
            );

        stealth =
            Math.min(
                stealth,
                5
            );


        // ----------------------------------------------------
        // APPLY LEG INJURY PENALTIES
        // ----------------------------------------------------

        const legPenalty =
            legInjuries +
            (legWounds * 2);


        might -=
            legPenalty;

        mobility -=
            legPenalty;


        // ----------------------------------------------------
        // DISPLAY FINAL STATS
        // ----------------------------------------------------

        mightField.value =
            might;

        paddingField.value =
            padding;

        fortitudeField.value =
            fortitude;

        enduranceField.value =
            endurance;

        mobilityField.value =
            mobility;

        stealthField.value =
            stealth;


        // ----------------------------------------------------
        // GRAPPLING
        //
        // Final Might
        // + Height modifier
        // + ABRAZARE
        // ----------------------------------------------------

        let grappling =
            might +
            Number(character.GrapplingBase) +
            skills.Grappling;


        if (
            !isNaN(grappling)
        ) {

            character.Grappling =
                grappling;

            grapplingField.value =
                grappling;

        }

        else {

            character.Grappling =
                "";

            grapplingField.value =
                "";

        }


        // ----------------------------------------------------
        // PRIORITY
        // ----------------------------------------------------
        //
        // Priority itself is NOT changed.
        //
        // Leg Injury = -1
        // Leg Wound  = -2
        // ----------------------------------------------------

        const priorityPenalty =
            legInjuries +
            (legWounds * 2);


        if (
            priorityPenalty > 0
        ) {

            priorityPenaltyField.value =
                "-" + priorityPenalty;

        }

        else {

            priorityPenaltyField.value =
                "";

        }


        // ----------------------------------------------------
        // MOVEMENT
        // ----------------------------------------------------

        let movement =
            40 -
            Number(weightField.value);


        // UNARMORED: +10

        movement +=
            skills.Movement;


        // Leg Injuries: -1 each

        movement -=
            legInjuries;


        // Leg Wounds: halve movement.
        // Multiple wounds continue halving.

        for (
            let i = 0;
            i < legWounds;
            i++
        ) {

            movement =
                movement / 2;

        }


        if (
            !isNaN(movement)
        ) {

            movementField.value =
                movement;

            character.Movement =
                movement;

        }

        else {

            movementField.value =
                "";

            character.Movement =
                "";

        }

    }


    // ========================================================
    // UPDATE MOVEMENT
    // ========================================================

    function updateMovement() {

        const weight =
            Number(weightField.value);

        if (
            !isNaN(weight)
        ) {

            character.Movement =
                40 - weight;

            movementField.value =
                character.Movement;

        }

        else {

            character.Movement =
                "";

            movementField.value =
                "";

        }

    }


    // ========================================================
    // UPDATE WEIGHT E
    // ========================================================

    function updateWeightIndicator() {

        const weight =
            Number(weightField.value);

        const baseWeight =
            Number(weightBaseField.value);


        if (
            !isNaN(weight) &&
            !isNaN(baseWeight)
        ) {

            if (
                weight >
                baseWeight * 2
            ) {

                weightEIndicatorField.value =
                    "E";

            }

            else {

                weightEIndicatorField.value =
                    "";

            }

        }

        else {

            weightEIndicatorField.value =
                "";

        }

    }


    // ========================================================
    // UPDATE EVERYTHING
    // ========================================================

    function updateAllStats() {

        updateGrappling();

        updateMovement();

        updateWeightIndicator();

        updateInjuryEffects();

    }


    // ========================================================
    // WEIGHT INPUT
    // ========================================================

    weightField.addEventListener(
        "input",
        function () {

            character.Weight =
                weightField.value;

            updateAllStats();

        }
    );


    // ========================================================
    // SKILL INPUT
    // ========================================================

    if (
        skillField
    ) {

        skillField.addEventListener(
            "input",
            function () {

                updateAllStats();

            }
        );

    }


    // ========================================================
    // PHYSIQUE / HEIGHT
    // ========================================================

    physiqueField.addEventListener(
        "change",
        updatePhysique
    );


    heightField.addEventListener(
        "change",
        function () {

            updateHeight();

            updateAllStats();

        }
    );


    // ========================================================
    // ADD INJURY
    // ========================================================

    injurySelect.addEventListener(
        "change",
        function () {

            const injuryType =
                injurySelect.value;

            if (
                !injuryType
            ) {

                return;

            }


            // ------------------------------------------------
            // Create a separate injury object.
            //
            // Every injury instance gets its own tracker.
            // Tracked injuries start at 1.
            // Everything else gets no tracker.
            // ------------------------------------------------

            const injury = {

                type: injuryType,

                tracker:
                    trackedInjuries.has(injuryType)
                        ? 1
                        : null

            };


            // Allow duplicates.

            injuries.push(
                injury
            );


            renderInjuries();


            injurySelect.value =
                "";

        }
    );


    // ========================================================
    // RENDER INJURIES
    // ========================================================

    function renderInjuries() {

        injuryTokens.innerHTML =
            "";


        injuries.forEach(
            function (
                injury,
                index
            ) {

                const token =
                    document.createElement(
                        "div"
                    );


                token.className =
                    "injury-token";


                // ------------------------------------------------
                // IMAGE
                // ------------------------------------------------

                const image =
                    document.createElement(
                        "img"
                    );


                image.src =
                    injuryImages[
                        injury.type
                    ];


                image.alt =
                    injury.type;


                image.draggable =
                    false;


                // ------------------------------------------------
                // CLICK IMAGE/TOKEN TO REMOVE
                // ------------------------------------------------
                //
                // The tracker stops this click from reaching
                // the injury token itself.
                // ------------------------------------------------

                token.addEventListener(
                    "click",
                    function () {

                        injuries.splice(
                            index,
                            1
                        );

                        renderInjuries();

                    }
                );


                token.appendChild(
                    image
                );


                // ------------------------------------------------
                // TRACKER
                // ------------------------------------------------

                if (
                    trackedInjuries.has(
                        injury.type
                    )
                ) {

                    const tracker =
                        document.createElement(
                            "div"
                        );


                    tracker.className =
                        "injury-tracker";


                    // --------------------------------------------
                    // DECREASE BUTTON
                    // --------------------------------------------

                    const decreaseButton =
                        document.createElement(
                            "button"
                        );


                    decreaseButton.type =
                        "button";

                    decreaseButton.textContent =
                        "−";


                    decreaseButton.addEventListener(
                        "click",
                        function (event) {

                            event.stopPropagation();


                            if (
                                injury.tracker > 1
                            ) {

                                injury.tracker--;

                                renderInjuries();

                            }

                        }
                    );


                    // --------------------------------------------
                    // NUMBER
                    // --------------------------------------------

                    const number =
                        document.createElement(
                            "span"
                        );


                    number.textContent =
                        injury.tracker;


                    // --------------------------------------------
                    // INCREASE BUTTON
                    // --------------------------------------------

                    const increaseButton =
                        document.createElement(
                            "button"
                        );


                    increaseButton.type =
                        "button";

                    increaseButton.textContent =
                        "+";


                    increaseButton.addEventListener(
                        "click",
                        function (event) {

                            event.stopPropagation();


                            if (
                                injury.tracker < 3
                            ) {

                                injury.tracker++;

                                renderInjuries();

                            }

                        }
                    );


                    tracker.appendChild(
                        decreaseButton
                    );

                    tracker.appendChild(
                        number
                    );

                    tracker.appendChild(
                        increaseButton
                    );


                    token.appendChild(
                        tracker
                    );

                }


                injuryTokens.appendChild(
                    token
                );

            }
        );


        updateAllStats();

    }

    // ========================================================
// RESPONSIVE CHARACTER SHEET
// ========================================================

const sheetWrapper =
    document.querySelector(".sheet-wrapper");

const characterSheet =
    document.querySelector(".character-sheet");


function resizeCharacterSheet() {

    if (!sheetWrapper || !characterSheet) {
        return;
    }


    // Original design width
    const designWidth = 1200;


    // Get the actual height of the unscaled sheet.
    const designHeight =
        characterSheet.scrollHeight;


    // Available browser width.
    const availableWidth =
        document.documentElement.clientWidth;


    // Never enlarge beyond the original 1200px size.
    const scale =
        Math.min(
            1,
            availableWidth / designWidth
        );


    // Scale the entire original sheet.
    characterSheet.style.transform =
        `scale(${scale})`;


    characterSheet.style.transformOrigin =
        "top left";


    // Make the wrapper match the VISUAL scaled size.
    sheetWrapper.style.width =
        (designWidth * scale) + "px";


    sheetWrapper.style.height =
        (designHeight * scale) + "px";

}


// Recalculate whenever the browser changes size.
window.addEventListener(
    "resize",
    resizeCharacterSheet
);


// Also account for phone orientation changes.
window.addEventListener(
    "orientationchange",
    resizeCharacterSheet
);


// Run it when the page first loads.
resizeCharacterSheet();


    // ========================================================
    // INITIALIZE
    // ========================================================

    updatePhysique();

    updateHeight();

    updateAllStats();


    console.log(
        "Character initialized as Average / Average."
    );

});
