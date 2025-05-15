let lastResult = 0;
let modes = ["物理傷害計算", "魔法傷害計算"];
let currentModeIndex = 0;

function calculatePhysicalPowerBonus(physicalPower) {
    if (physicalPower <= 0) return -0.8;

    const brackets = [
        { min: 0,  max: 5,   baseBonus: -0.8,  rate: 0.1 },
        { min: 5,  max: 7,   baseBonus: -0.3,  rate: 0.05 },
        { min: 7,  max: 11,  baseBonus: -0.2,  rate: 0.03 },
        { min: 11, max: 15,  baseBonus: -0.08, rate: 0.02 },
        { min: 15, max: 50,  baseBonus: 0.0,   rate: 0.01 },
        { min: 50, max: 60,  baseBonus: 0.35,   rate: 0.005 },
        { min: 60, max: 100, baseBonus: 0.5, rate: 0.0025 },
    ];

    for (const bracket of brackets) {
        if (physicalPower <= bracket.max) {
            return bracket.baseBonus + (physicalPower - bracket.min) * bracket.rate;
        }
    }

    return -0.8; // fallback, should never hit
}

function calculateMagicPowerBonus(magicPower) {
    if (magicPower <= 0) return -0.8;

    const brackets = [
        { min: 0,  max: 5,   baseBonus: -0.8,  rate: 0.1 },
        { min: 5,  max: 7,   baseBonus: -0.3,  rate: 0.05 },
        { min: 7,  max: 11,  baseBonus: -0.2,  rate: 0.03 },
        { min: 11, max: 15,  baseBonus: -0.08, rate: 0.02 },
        { min: 15, max: 50,  baseBonus: 0.0,   rate: 0.01 },
        { min: 50, max: 60,  baseBonus: 0.35,   rate: 0.005 },
        { min: 60, max: 100, baseBonus: 0.5, rate: 0.0025 },
    ];

    for (const bracket of brackets) {
        if (magicPower <= bracket.max) {
            return bracket.baseBonus + (magicPower - bracket.min) * bracket.rate;
        }
    }

    return -0.8; // fallback, should never hit
}

function updatePhysicalPower() {
    const strength = parseFloat(document.getElementById('strength').value);
    const physicalPower = strength; // 1力量 = 1物理強度
    document.getElementById('physical_power').value = physicalPower;

    const physicalPowerBonus = calculatePhysicalPowerBonus(physicalPower);
    document.getElementById('physical_power_bonus').value = physicalPowerBonus.toFixed(2);
}

function updateMagicPower() {
    const will = parseFloat(document.getElementById('will').value);
    const magicPower = will; // 1意志 = 1魔法強度
    document.getElementById('magic_power').value = magicPower;

    const magicPowerBonus = calculateMagicPowerBonus(magicPower);
    document.getElementById('magic_power_bonus').value = magicPowerBonus.toFixed(2);
}

function setMode(index) {
    currentModeIndex = index;
    document.getElementById('mode').textContent = `當前模式: ${modes[currentModeIndex]}`;
    
    // Get all input groups
    const damageLabel = document.getElementById("damage")
    const additionalDamageLabel = document.getElementById("additional_damage_label")
    const trueDamageLabel = document.getElementById("true_damage_label")
    const penetrationeLabel = document.getElementById("penetration_label")
    const damageReductionLabel = document.getElementById("damage_reduction_label")

    const hitLocationGroup = document.querySelector('.input-group:has(#hit_location_bonus)');
    const gearWeaponDamageGroup = document.querySelector('.input-group:has(#gear_weapon_damage)');
    const scalingGroup = document.querySelector('.input-group:has(#scaling)');

    const strengthGroup = document.querySelector('.input-group:has(#strength)');
    const physicalPowerGroup = document.querySelector('.input-group:has(#physical_power)');
    const physicalPowerBonusGroup = document.querySelector('.input-group:has(#physical_power_bonus)');

    const willGroup = document.querySelector('.input-group:has(#will)');
    const magicPowerGroup = document.querySelector('.input-group:has(#magic_power)');
    const magicPowerBonusGroup = document.querySelector('.input-group:has(#magic_power_bonus)');
    
    // Show/hide fields based on mode
    if (index === 0) { // Physical damage mode
        damageLabel.innerText = "武器傷害:"
        additionalDamageLabel.innerText = "額外物理傷害:"
        trueDamageLabel.innerText = "真實物理傷害:"
        penetrationeLabel.innerText = "護甲穿透:"
        damageReductionLabel.innerText = "物理傷害減免:"

        strengthGroup.style.display = 'flex';
        physicalPowerGroup.style.display = 'flex';
        physicalPowerBonusGroup.style.display = 'flex';
        gearWeaponDamageGroup.style.display = 'flex';

        willGroup.style.display = 'none';
        magicPowerGroup.style.display = 'none';
        magicPowerBonusGroup.style.display = 'none';

        hitLocationGroup.style.display = 'flex';
        document.getElementById('hit_location_bonus').value = '1.5'; // 重設為預設值
        scalingGroup.style.display = 'none';
        document.getElementById('scaling').value = '1.0'; // 重設為預設值

    } else if (index === 1) { // Magic damage mode
        damageLabel.innerText = "法術傷害:"
        additionalDamageLabel.innerText = "額外魔法傷害:"
        trueDamageLabel.innerText = "真實魔法傷害:"
        penetrationeLabel.innerText = "魔法穿透:"
        damageReductionLabel.innerText = "魔法抗性:"

        strengthGroup.style.display = 'none';
        physicalPowerGroup.style.display = 'none';
        physicalPowerBonusGroup.style.display = 'none';
        gearWeaponDamageGroup.style.display = 'none';

        willGroup.style.display = 'flex';
        magicPowerGroup.style.display = 'flex';
        magicPowerBonusGroup.style.display = 'flex';

        hitLocationGroup.style.display = 'none';
        document.getElementById('hit_location_bonus').value = '1.0'; // 設定為1.0
        scalingGroup.style.display = 'flex';
        document.getElementById('scaling').value = '1'; // 重設為預設值
    }
}

function validateInputs() {
    // Get input values
    const penetration = parseFloat(document.getElementById('penetration').value);
    const damageReduction = parseFloat(document.getElementById('damage_reduction').value);
    const scaling = parseFloat(document.getElementById('scaling').value);

    let errorMessages = [];

    // Check penetration (0-1)
    if (penetration < 0 || penetration > 1) {
        errorMessages.push("護甲/魔法穿透必須在 0 到 1 之間");
    }

    // Check damage reduction (0-1)
    if (damageReduction < 0 || damageReduction > 1) {
        errorMessages.push("傷害減免/魔法抗性必須在 0 到 1 之間");
    }

    // Check scaling (0-1)
    if (scaling < 0 || scaling > 1) {
        errorMessages.push("法術縮放必須在 0 到 1 之間");
    }

    return errorMessages;
}

function calculateDamage() {
    try {
        // Validate inputs first
        const errors = validateInputs();
        if (errors.length > 0) {
            document.getElementById('result').textContent = `輸入錯誤: ${errors.join(', ')}`;
            return;
        }

        // Get input values
        const baseDamage = parseFloat(document.getElementById('base_damage').value);
        const scaling = parseFloat(document.getElementById('scaling').value);
        const additionalDamage = parseFloat(document.getElementById('additional_damage').value);
        const trueDamage = parseFloat(document.getElementById('true_damage').value);
        const penetration = parseFloat(document.getElementById('penetration').value);
        const gearWeaponDamage = parseFloat(document.getElementById('gear_weapon_damage').value);
        const hitLocationBonus = parseFloat(document.getElementById('hit_location_bonus').value);
        const damageReduction = parseFloat(document.getElementById('damage_reduction').value);

        // Constants
        const buffWeaponDamage = 0.0;
        const damageReductionMod = 1.0;
        const projectileReduction = 0.0;
        const projectileFalloff = 1.0;
        const comboMultiplier = 1.0;
        const impactZoneMultiplier = 1.0;
        const divineStrikeDamage = 0.0;

        const strength = parseFloat(document.getElementById('strength').value);
        const physicalPower = parseFloat(document.getElementById('physical_power').value);
        const physicalPowerBonus = parseFloat(document.getElementById('physical_power_bonus').value);

        const will = parseFloat(document.getElementById('will').value);
        const magicPower = parseFloat(document.getElementById('magic_power').value);
        const magicPowerBonus = parseFloat(document.getElementById('magic_power_bonus').value);

        if (modes[currentModeIndex] === "物理傷害計算") {
            powerBonus = calculatePhysicalPowerBonus(Number(strength + physicalPower)) + physicalPowerBonus

        } else if (modes[currentModeIndex] === "魔法傷害計算") {
            powerBonus = calculateMagicPowerBonus(Number(will + magicPower)) + magicPowerBonus;

        }

        // Calculate damage using the formula
        const damage = (
            (
                (
                    (baseDamage + buffWeaponDamage) * comboMultiplier * impactZoneMultiplier
                    + gearWeaponDamage + divineStrikeDamage
                ) * (1 + (powerBonus * scaling)) + (additionalDamage * scaling)
            ) * hitLocationBonus
            * (1 - damageReduction * (1 + damageReductionMod) * (1 - penetration))
            * (1 - projectileReduction)
        ) * projectileFalloff + trueDamage;

        // Update result display
        const resultElement = document.getElementById('result');
        resultElement.textContent = `計算結果(前次結果): ${damage.toFixed(2)}(${lastResult.toFixed(2)})`;
        lastResult = damage;

    } catch (error) {
        console.log(error);
        document.getElementById('result').textContent = "輸入格式錯誤!";
    }
}

// 在頁面載入時初始化顯示狀態
window.onload = function() {
    setMode(0); // 預設為物理傷害模式
    calculateDamage();
}; 
