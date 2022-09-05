const initialBalancingSchemaVersion = '0.00';
const initialBalancingContent = {
    "Item": [
      {
        "id": "gold",
        "name": "Gold",
        "asset": "gold.prefab",
        "capacity": "1000"
      },
      {
        "id": "lumber",
        "name": "Lumber",
        "asset": "lumber.prefab",
        "capacity": "1000"
      },
      {
        "id": "food",
        "name": "Food",
        "asset": "food.prefab",
        "capacity": "1500"
      },
      {
        "id": "iron",
        "name": "Iron",
        "asset": "iron.prefab",
        "capacity": "300"
      }
    ],
    "Building": [
      {
        "id": "farm",
        "name": "Farm",
        "asset": "farm.prefab",
        "maxQuantity": 3,
        "levelRequirement": "1",
        "buildTime": "5"
      },
      {
        "id": "gold-mine",
        "name": "Gold Mine",
        "asset": "goldmine.prefab",
        "maxQuantity": "3",
        "levelRequirement": "1",
        "buildTime": "7"
      },
      {
        "id": "lumber-mill",
        "name": "Lumber Mill",
        "asset": "lumbermill.prefab",
        "maxQuantity": "3",
        "levelRequirement": "1",
        "buildTime": "10"
      },
      {
        "id": "iron-mine",
        "name": "Iron Mine",
        "asset": "iron.prefab",
        "maxQuantity": 3,
        "levelRequirement": "1",
        "buildTime": "15"
      },
      {
        "id": "barracks",
        "name": "Barracks",
        "asset": "barrack.prefab",
        "maxQuantity": "1",
        "levelRequirement": "1",
        "buildTime": "20"
      }
    ],
    "BuildingCapacity": [
      {
        "id": "farm1",
        "buildingId": "farm",
        "level": 1,
        "capacity": "20",
        "cycleTime": "30"
      },
      {
        "id": "farm2",
        "buildingId": "farm",
        "level": 2,
        "capacity": "40",
        "cycleTime": "40"
      },
      {
        "id": "farm3",
        "buildingId": "farm",
        "level": 3,
        "capacity": "60",
        "cycleTime": "41"
      },
      {
        "id": "farm4",
        "buildingId": "farm",
        "level": 4,
        "capacity": "80",
        "cycleTime": "42"
      },
      {
        "id": "farm5",
        "buildingId": "farm",
        "level": 5,
        "capacity": "100",
        "cycleTime": "43"
      },
      {
        "id": "goldmine1",
        "buildingId": "gold-mine",
        "level": 1,
        "capacity": "20",
        "cycleTime": "44"
      },
      {
        "id": "goldmine2",
        "buildingId": "gold-mine",
        "level": 2,
        "capacity": "40",
        "cycleTime": "45"
      },
      {
        "id": "goldmine3",
        "buildingId": "gold-mine",
        "level": 3,
        "capacity": "60",
        "cycleTime": "46"
      },
      {
        "id": "goldmine4",
        "buildingId": "gold-mine",
        "level": 4,
        "capacity": "80",
        "cycleTime": "47"
      },
      {
        "id": "goldmine5",
        "buildingId": "gold-mine",
        "level": 5,
        "capacity": "100",
        "cycleTime": "48"
      },
      {
        "id": "lumbermill1",
        "buildingId": "lumber-mill",
        "level": 1,
        "capacity": "20",
        "cycleTime": "49"
      },
      {
        "id": "lumbermill2",
        "buildingId": "lumber-mill",
        "level": "2",
        "capacity": "40",
        "cycleTime": "50"
      },
      {
        "id": "lumbermill3",
        "buildingId": "lumber-mill",
        "level": 3,
        "capacity": "60",
        "cycleTime": "51"
      },
      {
        "id": "lumbermill4",
        "buildingId": "lumber-mill",
        "level": "4",
        "capacity": "80",
        "cycleTime": "52"
      },
      {
        "id": "lumbermill5",
        "buildingId": "lumber-mill",
        "level": 5,
        "capacity": "100",
        "cycleTime": "53"
      },
      {
        "id": "ironmine1",
        "buildingId": "iron-mine",
        "level": "1",
        "capacity": "20",
        "cycleTime": "54"
      },
      {
        "id": "ironmine2",
        "buildingId": "iron-mine",
        "level": "2",
        "capacity": "40",
        "cycleTime": "55"
      },
      {
        "id": "ironmine3",
        "buildingId": "iron-mine",
        "level": "3",
        "capacity": "60",
        "cycleTime": "56"
      },
      {
        "id": "ironmine4",
        "buildingId": "iron-mine",
        "level": "4",
        "capacity": "80",
        "cycleTime": "57"
      },
      {
        "id": "ironmine5",
        "buildingId": "iron-mine",
        "level": "5",
        "capacity": "100",
        "cycleTime": "58"
      },
      {
        "id": "barracks",
        "buildingId": "barracks",
        "level": "1",
        "capacity": "10",
        "cycleTime": "59"
      }
    ],
    "BuildingCost": [
      {
        "id": "farm",
        "buildingId": "farm",
        "gold": "10"
      },
      {
        "id": "gold-mine",
        "buildingId": "gold-mine",
        "resource": "food",
        "resourceQuantity": "10",
        "gold": "10"
      },
      {
        "id": "lumber-mill",
        "buildingId": "lumber-mill",
        "resource": "food",
        "resourceQuantity": "10",
        "gold": "10"
      },
      {
        "id": "iron-mine",
        "buildingId": "iron-mine",
        "resource": "lumber",
        "resourceQuantity": "10",
        "gold": "10"
      },
      {
        "id": "barracks",
        "buildingId": "barracks",
        "resource": "iron;lumber",
        "resourceQuantity": "10;5",
        "gold": "10"
      }
    ],
    "BuildingYield": [
      {
        "id": "goldmine-1",
        "buildingId": "goldmine",
        "name": "Produce gold",
        "produceType": "item",
        "itemId": "gold",
        "yield": "2"
      },
      {
        "id": "lumbermill-1",
        "buildingId": "lumbermill",
        "name": "Produce lumber",
        "produceType": "item",
        "itemId": "lumber",
        "yield": "1"
      },
      {
        "id": "farm-1",
        "buildingId": "farm",
        "name": "Produce Food",
        "produceType": "item",
        "itemId": "food",
        "yield": "1"
      },
      {
        "id": "ironmine-1",
        "buildingId": "iron-mine",
        "name": "Produce Iron",
        "produceType": "item",
        "itemId": "iron",
        "yield": "1"
      },
      {
        "id": "barracks-1",
        "buildingId": "barracks",
        "name": "Soldier",
        "produceType": "unit",
        "itemId": "soldier",
        "yield": "1"
      },
      {
        "id": "barracks-2",
        "buildingId": "barracks",
        "name": "Archer",
        "produceType": "unit",
        "itemId": "archer",
        "yield": "1"
      }
    ],
    "InventorySeed": [
      {
        "itemId": "gold",
        "quantity": "100"
      },
      {
        "itemId": "lumber",
        "quantity": "100"
      },
      {
        "itemId": "food",
        "quantity": "50"
      },
      {
        "itemId": "iron",
        "quantity": "10"
      }
    ],
    "CombatUnit": [
      {
        "id": "soldier",
        "name": "Soldier",
        "asset": "soldier.prefab",
        "startLevel": "1",
        "produceTime": "30"
      },
      {
        "id": "archer",
        "name": "Archer",
        "asset": "archer.prefab",
        "startLevel": "1",
        "produceTime": "60"
      }
    ],
    "CombatUnitProgression": [
      {
        "id": "soldier-1",
        "combatUnitId": "soldier",
        "level": "1",
        "hitpoints": "50",
        "attack": "10",
        "defence": "10",
        "attackSpeed": "3",
        "movementSpeed": "2",
        "range": "0"
      },
      {
        "id": "soldier-2",
        "combatUnitId": "soldier",
        "level": "2",
        "hitpoints": "55",
        "attack": "12",
        "defence": "11",
        "attackSpeed": "4",
        "movementSpeed": "3",
        "range": "0"
      },
      {
        "id": "archer-1",
        "combatUnitId": "archer",
        "level": "1",
        "hitpoints": "30",
        "attack": "15",
        "defence": "5",
        "attackSpeed": "3",
        "movementSpeed": "1",
        "range": "1"
      },
      {
        "id": "archer-2",
        "combatUnitId": "archer",
        "level": "2",
        "hitpoints": "35",
        "attack": "16",
        "defence": "6",
        "attackSpeed": "4",
        "movementSpeed": "2",
        "range": "2"
      },
      {
        "id": "artillery-1",
        "combatUnitId": "artillery",
        "level": "1",
        "hitpoints": "20",
        "attack": "20",
        "defence": "1",
        "attackSpeed": "1",
        "movementSpeed": "1",
        "range": "5"
      },
      {
        "id": "artillery-2",
        "combatUnitId": "artillery",
        "level": "2",
        "hitpoints": "21",
        "attack": "21",
        "defence": "2",
        "attackSpeed": "2",
        "movementSpeed": "2",
        "range": "6"
      }
    ],
    "ZanisProgression": [
      {
        "id": "zani_tiger-1",
        "combatUnitId": "tiger",
        "level": "1",
        "shardsForlvl": "5",
        "hitpoints": "400",
        "attack": "30",
        "defence": "20",
        "attackSpeed": "10",
        "movementSpeed": "4",
        "range": "0"
      },
      {
        "id": "zani_tiger-2",
        "combatUnitId": "tiger",
        "level": "2",
        "shardsForlvl": "7",
        "combatStats": "3",
        "skillPoints": "1",
        "skillUnlock": "self_heal"
      },
      {
        "id": "zani_tiger-3",
        "combatUnitId": "tiger",
        "level": "3",
        "shardsForlvl": "9",
        "combatStats": "5",
        "skillPoints": "1"
      },
      {
        "id": "zani_tiger-4",
        "combatUnitId": "tiger",
        "level": "4",
        "shardsForlvl": "12",
        "combatStats": "7",
        "skillPoints": "2",
        "skillUnlock": "quick_slice"
      },
      {
        "id": "zani_tiger-5",
        "combatUnitId": "tiger",
        "level": "5",
        "shardsForlvl": "16",
        "combatStats": "9",
        "skillPoints": "2",
        "skillUnlock": "battle_cry"
      },
      {
        "id": "zani_tiger-6",
        "combatUnitId": "tiger",
        "level": "6",
        "shardsForlvl": "20",
        "combatStats": "12",
        "skillPoints": "3"
      },
      {
        "id": "zani_tiger-7",
        "combatUnitId": "tiger",
        "level": "7",
        "shardsForlvl": "25",
        "combatStats": "15",
        "skillPoints": "3"
      },
      {
        "id": "zani_tiger-8",
        "combatUnitId": "tiger",
        "level": "8",
        "shardsForlvl": "32",
        "combatStats": "20",
        "skillPoints": "4",
        "skillUnlock": "fear"
      },
      {
        "id": "zani_tiger-9",
        "combatUnitId": "tiger",
        "level": "9",
        "shardsForlvl": "39",
        "combatStats": "25",
        "skillPoints": "5"
      },
      {
        "id": "zani_tiger-10",
        "combatUnitId": "tiger",
        "level": "10",
        "shardsForlvl": "48",
        "combatStats": "30",
        "skillPoints": "6"
      },
      {
        "id": "zani_tiger-11",
        "combatUnitId": "tiger",
        "level": "11",
        "shardsForlvl": "58",
        "combatStats": "35",
        "skillPoints": "7",
        "skillUnlock": "heal"
      },
      {
        "id": "zani_tiger-12",
        "combatUnitId": "tiger",
        "level": "12",
        "shardsForlvl": "70",
        "combatStats": "40",
        "skillPoints": "8"
      },
      {
        "id": "zani_bear-1",
        "combatUnitId": "bear",
        "level": "1",
        "shardsForlvl": "5",
        "hitpoints": "500",
        "attack": "20",
        "defence": "40",
        "attackSpeed": "7",
        "movementSpeed": "3",
        "range": "0"
      },
      {
        "id": "zani_bear-2",
        "combatUnitId": "bear",
        "level": "2",
        "shardsForlvl": "7",
        "combatStats": "3",
        "skillPoints": "1"
      },
      {
        "id": "zani_bear-3",
        "combatUnitId": "bear",
        "level": "3",
        "shardsForlvl": "9",
        "combatStats": "5",
        "skillPoints": "1",
        "skillUnlock": "thorny_fur"
      },
      {
        "id": "zani_bear-4",
        "combatUnitId": "bear",
        "level": "4",
        "shardsForlvl": "12",
        "combatStats": "7",
        "skillPoints": "2"
      },
      {
        "id": "zani_bear-5",
        "combatUnitId": "bear",
        "level": "5",
        "shardsForlvl": "16",
        "combatStats": "9",
        "skillPoints": "2",
        "skillUnlock": "bear_hug"
      },
      {
        "id": "zani_bear-6",
        "combatUnitId": "bear",
        "level": "6",
        "shardsForlvl": "20",
        "combatStats": "12",
        "skillPoints": "3"
      },
      {
        "id": "zani_bear-7",
        "combatUnitId": "bear",
        "level": "7",
        "shardsForlvl": "25",
        "combatStats": "15",
        "skillPoints": "3",
        "skillUnlock": "battle_cry"
      },
      {
        "id": "zani_bear-8",
        "combatUnitId": "bear",
        "level": "8",
        "shardsForlvl": "32",
        "combatStats": "20",
        "skillPoints": "4"
      },
      {
        "id": "zani_bear-9",
        "combatUnitId": "bear",
        "level": "9",
        "shardsForlvl": "39",
        "combatStats": "25",
        "skillPoints": "5"
      },
      {
        "id": "zani_bear-10",
        "combatUnitId": "bear",
        "level": "10",
        "shardsForlvl": "48",
        "combatStats": "30",
        "skillPoints": "6",
        "skillUnlock": "fear"
      },
      {
        "id": "zani_bear-11",
        "combatUnitId": "bear",
        "level": "11",
        "shardsForlvl": "58",
        "combatStats": "35",
        "skillPoints": "7"
      },
      {
        "id": "zani_bear-12",
        "combatUnitId": "bear",
        "level": "12",
        "shardsForlvl": "70",
        "combatStats": "40",
        "skillPoints": "8",
        "skillUnlock": "heal"
      }
    ],
    "SkillsProgression": [
      {
        "id": "quick_slice-1",
        "skillId": "quick slice",
        "level": "1",
        "attackSpeedPer": "5",
        "recharge": "35"
      },
      {
        "id": "quick_slice-2",
        "skillId": "quick slice",
        "level": "2",
        "attackSpeedPer": "7",
        "recharge": "33"
      },
      {
        "id": "quick_slice-3",
        "skillId": "quick slice",
        "level": "3",
        "attackSpeedPer": "10",
        "recharge": "30"
      },
      {
        "id": "quick_slice-4",
        "skillId": "quick slice",
        "level": "4",
        "attackSpeedPer": "13",
        "recharge": "27"
      },
      {
        "id": "quick_slice-5",
        "skillId": "quick slice",
        "level": "5",
        "attackSpeedPer": "17",
        "recharge": "24"
      },
      {
        "id": "quick_slice-6",
        "skillId": "quick slice",
        "level": "6",
        "attackSpeedPer": "21",
        "recharge": "21"
      },
      {
        "id": "quick_slice-7",
        "skillId": "quick slice",
        "level": "7",
        "attackSpeedPer": "25",
        "recharge": "18"
      },
      {
        "id": "quick_slice-8",
        "skillId": "quick slice",
        "level": "8",
        "attackSpeedPer": "30",
        "recharge": "15"
      },
      {
        "id": "quick_slice-9",
        "skillId": "quick slice",
        "level": "9",
        "attackSpeedPer": "35",
        "recharge": "11"
      },
      {
        "id": "quick_slice-10",
        "skillId": "quick slice",
        "level": "10",
        "attackSpeedPer": "42",
        "recharge": "5"
      }
    ]
  }