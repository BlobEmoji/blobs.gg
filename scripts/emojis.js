/* eslint-disable max-classes-per-file */

export class Emoji {
  constructor(guild, data) {
    this.guild = guild
    Object.assign(this, data)
  }
}

export class Guild {
  constructor(id, guild) {
    this.id = id
    this.name = guild.name
    this.invite = guild.invite
    this.icon = guild.icon

    this.emoji = guild.emoji.map((emoji) => new Emoji(this, emoji))
  }
}

export class EmojiGroup {
  constructor(guildMapping) {
    this.guilds = Object.entries(guildMapping).map(
      ([guildId, guild]) => new Guild(guildId, guild)
    )
  }
}

export class Emojis {
  constructor(data) {
    this.groups = {}

    for (const [groupName, guildMapping] of Object.entries(data)) {
      this.groups[groupName] = new EmojiGroup(guildMapping)
    }
  }

  /**
   * Returns all guilds across all groups.
   * @return {Guild[]} All guilds.
   */
  getAllGuilds() {
    return [...Object.values(this.groups).flatMap((group) => group.guilds)]
  }

  /**
   * Returns all emoji across all guilds across all groups.
   * @return {Emoji[]} All emoji.
   */
  getAllEmoji() {
    return this.getAllGuilds().flatMap((guild) => guild.emoji)
  }
}
