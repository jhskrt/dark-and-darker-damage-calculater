let lastResult = 0;

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