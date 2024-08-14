# dark-and-darker-damage-calculater

## How to download 如何下載
點擊右側 Releases 下載最新版本
打開程式即可使用

## How to use 如何使用
在對應的輸入欄位輸入數值並按下 "計算" 按鈕即可獲得結果

## Input explanation 輸入欄位解釋

⚠️ 物理強度加成、護甲穿透以及傷害減免欄位請輸入小數

武器傷害(Weapon Damage)： 武器的基礎傷害

受擊部位(Hit Location)： 打頭造成 1.5x 、身體 1.0x 、手臂0.8x 、腿0.6x 、手/腳 0.5x 傷害

物理(魔法)強度加成(Physical Power Bonus)： 可以直接由角色細則查看，此數值受力量(意志)、物理(魔法)強度以及物理(魔法)傷害加成影響，其中1力量(意志) = 1物理(魔法)強度，物理強度：物理強度加成請參考 [wiki](<https://darkanddarker.wiki.spellsandguns.com/Stats#Physical_Power>)

![image](https://github.com/user-attachments/assets/7adae393-d79c-40ad-9918-6da0c4c36cb2)

魔法強度：魔法強度加成請參考 [wiki](<https://darkanddarker.wiki.spellsandguns.com/Stats#Magical_Power>)

![image](https://github.com/user-attachments/assets/fa1396af-2520-4f95-bd8f-cdd381bf7f89)

額外/真實物理(魔法)傷害(Additional/True Damage)： 裝備詞條提供的額外/真實傷害

護甲/魔法穿透(Armor/Magic Penetration)： 裝備詞條提供的護甲/魔法穿透

額外武器傷害(Addition Weapon Damage)： 武器詞條提供的額外武器傷害

物理傷害減免/魔法抗性(Physical Damage Reduction/Magic Resistance)： 由護甲值和裝備詞條決定的物理傷害減免，可以直接由角色細則查看，護甲值：傷害減免請參考 [wiki](<https://darkanddarker.wiki.spellsandguns.com/Stats#Armor_Rating>)

## Damage Formula 傷害公式
```
(
  (
    (
        + (Base Damage + Buff Weapon Damage) * Combo Multiplier * Impact Zone Multiplier
        + Gear Weapon Damage|Magical Damage
        + Divine Strike Damage
    )
    * (1 + Power Bonus)
    + Additional Damage
  )
  * (1 + Hit Location Bonus)
  * (1 + Race Damage Bonus)
  * (1 - Race Damage Reduction)
  * (1 - Damage Reduction * (1 + Damage Reduction Mod) * (1 - Penetration))
  * (1 - Projectile Reduction)
)
* Projectile Falloff
+ True Damage
```

⚠️ 此公式為 wiki 提供，與遊戲內翻譯不同，各變數解釋請參考 wiki

[公式詳解 wiki](<https://darkanddarker.wiki.spellsandguns.com/Damage>)

## Source 資料來源

以上資料皆來自 https://darkanddarker.wiki.spellsandguns.com/Dark_and_Darker_Wiki

## QnA

Q1 : 我有發現問題或建議該如何反應

A1 : 歡迎發 Issues 討論



Q2 : 算出來的傷害怎麼會有小數點?

A2 : 遊戲內傷害跟生命都有小數點，只是顯示會取整數而已，生命值無條件進位，假人傷害無條件捨去，請參考 [wiki](<https://darkanddarker.wiki.spellsandguns.com/Damage#Rounding>)



Q3 : 參考了 Q2 但算出來還是錯的阿

A3 : 那應該是我寫錯了，本程式並沒有經過嚴謹的驗算和證實，如有誤歡迎提 Issues 討論
