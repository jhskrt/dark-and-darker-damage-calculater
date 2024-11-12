let lastResult = 0;

function calculatePhysicalPowerBonus(physicalPower) {
    let bonus = -0.8; // Start at -80%
    if (physicalPower > 0) {
        if (physicalPower <= 5) {
            bonus += physicalPower * 0.1;
        } else if (physicalPower <= 7) {
            bonus += 0.5 + (physicalPower - 5) * 0.05;
        } else if (physicalPower <= 11) {
            bonus += 0.6 + (physicalPower - 7) * 0.03;
        } else if (physicalPower <= 15) {
            bonus += 0.72 + (physicalPower - 11) * 0.02;
        } else if (physicalPower <= 50) {
            bonus += 0.8 + (physicalPower - 15) * 0.01;
        } else {
            bonus += 1.15 + (physicalPower - 50) * 0.005;
        }
    }
    return bonus;
}

function calculateMagicPowerBonus(magicPower) {
    let bonus = -0.9; // Start at -90%
    if (magicPower > 0) {
        if (magicPower <= 5) {
            bonus += (magicPower - 1) * 0.1;
        } else if (magicPower <= 15) {
            bonus += 0.4 + (magicPower - 5) * 0.05;
        } else if (magicPower <= 21) {
            bonus += 0.9 + (magicPower - 15) * 0.025;
        } else if (magicPower <= 40) {
            bonus += 1.05 + (magicPower - 21) * 0.02;
        } else if (magicPower <= 50) {
            bonus += 1.43 + (magicPower - 40) * 0.01;
        } else {
            bonus += 1.53 + (magicPower - 50) * 0.005;
        }
    }
    return bonus;
}

function calculateDamage() {
    try {
        // Get input values
        const baseDamage = parseFloat(document.getElementById('base_damage').value);
        const powerBonus = parseFloat(document.getElementById('power_bonus').value);
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

        // Calculate damage using the formula
        const damage = (
            (
                (
                    (baseDamage + buffWeaponDamage) * comboMultiplier * impactZoneMultiplier
                    + gearWeaponDamage + divineStrikeDamage
                ) * (1 + powerBonus) + additionalDamage
            ) * hitLocationBonus
            * (1 - damageReduction * (1 + damageReductionMod) * (1 - penetration))
            * (1 - projectileReduction)
        ) * projectileFalloff + trueDamage;

        // Update result display
        const resultElement = document.getElementById('result');
        resultElement.textContent = `計算結果(前次結果): ${damage.toFixed(2)}(${lastResult.toFixed(2)})`;
        lastResult = damage;

    } catch (error) {
        document.getElementById('result').textContent = "輸入格式錯誤!";
    }
} 