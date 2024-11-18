import tkinter as tk

last_result = [0]
mode = ["物理傷害計算", "魔法傷害計算", "混傷模式傷害計算"]
current_mode_index = [0]  # 使用列表來保持可變性

def calculate_physical_power_bonus(physical_power) -> float:
    bonus = -0.8  # Start at -80%
    if physical_power > 0:
        if physical_power <= 5:
            bonus += physical_power * 0.1
        elif physical_power <= 7:
            bonus += 0.5 + (physical_power - 5) * 0.05
        elif physical_power <= 11:
            bonus += 0.6 + (physical_power - 7) * 0.03
        elif physical_power <= 15:
            bonus += 0.72 + (physical_power - 11) * 0.02
        elif physical_power <= 50:
            bonus += 0.8 + (physical_power - 15) * 0.01
        else:
            bonus += 1.15 + (physical_power - 50) * 0.005
    return bonus

def calculate_magic_power_bonus(magic_power) -> float:
    bonus = -0.9  # Start at -90%
    if magic_power > 0:
        if magic_power <= 5:
            bonus += (magic_power - 1) * 0.1
        elif magic_power <= 15:
            bonus += 0.4 + (magic_power - 5) * 0.05
        elif magic_power <= 21:
            bonus += 0.9 + (magic_power - 15) * 0.025
        elif magic_power <= 40:
            bonus += 1.05 + (magic_power - 21) * 0.02
        elif magic_power <= 50:
            bonus += 1.43 + (magic_power - 40) * 0.01
        else:
            bonus += 1.53 + (magic_power - 50) * 0.005
    return bonus

def switch_mode():
    current_mode_index[0] = (current_mode_index[0] + 1) % len(mode)
    label_mode.config(text=f"當前模式: {mode[current_mode_index[0]]}")

def calculate_damage():
    try:
        # 傷害
        base_damage = float(entry_base_damage.get())  # 武器基礎傷害
        additional_damage = float(entry_additional_damage.get())  # 額外物理(魔法)傷害
        true_damage = float(entry_true_damage.get())  # 真實外物理(魔法)傷害
        penetration = float(entry_penetration.get())  # 護甲穿透
        gear_weapon_damage = float(entry_gear_weapon_damage.get())  # 額外武器傷害
        hit_location_bonus = float(entry_hit_location_bonus.get())  # 受擊部位
        damage_reduction = float(entry_damage_reduction.get())

        # Constants
        buff_weapon_damage = 0.0  # 天賦影響的加成(詩人戰歌等)
        damage_reduction_mod = 1.0
        projectile_reduction = 0.0
        projectile_falloff = 1.0
        combo_multiplier = 1.0
        impact_zone_multiplier = 1.0
        divine_strike_damage = 0.0

        if mode[current_mode_index[0]] == "物理傷害計算":
            strength = int(entry_strength.get())  # 力量
            physical_power = int(entry_power.get() + strength)  # 1力量 = 1物理強度
            power_bonus = calculate_physical_power_bonus(physical_power) + entry_power_bonus.get()

        elif mode[current_mode_index[0]] == "魔法傷害計算":
            will = float(entry_will.get())  # 意志
            magic_power = int(entry_magic_power.get() + will)  # 假設 1意志 = 1魔法強度
            power_bonus = calculate_magic_power_bonus(magic_power)

        else:  # 混傷模式傷害計算
            strength = float(entry_strength.get())
            will = float(entry_will.get())
            physical_power = strength
            magic_power = will
            power_bonus = (calculate_physical_power_bonus(physical_power) + calculate_magic_power_bonus(magic_power)) / 2

        # Calculate damage using the formula
        damage = (
            (
                (
                    (base_damage + buff_weapon_damage) * combo_multiplier * impact_zone_multiplier
                    + gear_weapon_damage + divine_strike_damage
                ) * (1 + power_bonus) + additional_damage
            ) * hit_location_bonus
            * (1 - damage_reduction * (1 + damage_reduction_mod) * (1 - penetration))
            * (1 - projectile_reduction)
        ) * projectile_falloff + true_damage

        last_result.append(damage)
        label_result.config(text=f"計算結果(前次結果): {damage}({last_result[-2]})")
        last_result.pop(0)

    except ValueError:
        label_result.config(text="輸入格式錯誤!")

# GUI setup
root = tk.Tk()
root.title("Dark and Darker 傷害計算器")

tk.Label(root, text="武器傷害:").grid(row=0, column=0)
entry_base_damage = tk.Entry(root)
entry_base_damage.insert(0, 1)
entry_base_damage.grid(row=0, column=1)

tk.Label(root, text="受擊部位:").grid(row=1, column=0)
entry_hit_location_bonus = tk.Entry(root)
entry_hit_location_bonus.insert(0, 1.0)
entry_hit_location_bonus.grid(row=1, column=1)

tk.Label(root, text="力量:").grid(row=2, column=0)
entry_strength = tk.Entry(root)
entry_strength.insert(0, 0)

entry_strength.grid(row=2, column=1)
tk.Label(root, text="物理強度:").grid(row=2, column=0)
entry_power = tk.Entry(root)
entry_power.insert(0, 0)
entry_power.grid(row=2, column=1)

tk.Label(root, text="物理傷害加成:").grid(row=2, column=0)
entry_power_bonus = tk.Entry(root)
entry_power_bonus.insert(0, 0)
entry_power_bonus.grid(row=2, column=1)

tk.Label(root, text="意志:").grid(row=3, column=0)
entry_will = tk.Entry(root)
entry_will.insert(0, 0)
entry_will.grid(row=3, column=1)

entry_strength.grid(row=2, column=1)
tk.Label(root, text="魔法強度:").grid(row=2, column=0)
entry_magic_power = tk.Entry(root)
entry_magic_power.insert(0, 0)
entry_magic_power.grid(row=2, column=1)

tk.Label(root, text="魔法傷害加成:").grid(row=2, column=0)
entry_magic_power_bonus = tk.Entry(root)
entry_magic_power_bonus.insert(0, 0)
entry_magic_power_bonus.grid(row=2, column=1)

tk.Label(root, text="額外物理(魔法)傷害:").grid(row=4, column=0)
entry_additional_damage = tk.Entry(root)
entry_additional_damage.insert(0, 0)
entry_additional_damage.grid(row=4, column=1)

tk.Label(root, text="真實物理(魔法)傷害:").grid(row=5, column=0)
entry_true_damage = tk.Entry(root)
entry_true_damage.insert(0, 0)
entry_true_damage.grid(row=5, column=1)

tk.Label(root, text="護甲(魔法)穿透:").grid(row=6, column=0)
entry_penetration = tk.Entry(root)
entry_penetration.insert(0, 0)
entry_penetration.grid(row=6, column=1)

tk.Label(root, text="額外武器傷害:").grid(row=7, column=0)
entry_gear_weapon_damage = tk.Entry(root)
entry_gear_weapon_damage.insert(0, 0)
entry_gear_weapon_damage.grid(row=7, column=1)

tk.Label(root, text="物理傷害減免/魔法抗性:").grid(row=8, column=0)
entry_damage_reduction = tk.Entry(root)
entry_damage_reduction.insert(0, 0)
entry_damage_reduction.grid(row=8, column=1)

button_calculate = tk.Button(root, text="計算", command=calculate_damage)
button_calculate.grid(row=9, column=0, columnspan=2)

button_switch_mode = tk.Button(root, text="切換模式", command=switch_mode)
button_switch_mode.grid(row=10, column=0, columnspan=2)

label_mode = tk.Label(root, text=f"當前模式: {mode[current_mode_index[0]]}")
label_mode.grid(row=11, column=0, columnspan=2)

label_result = tk.Label(root, text="計算結果(前次結果):")
label_result.grid(row=12, column=0, columnspan=2)

root.mainloop()
