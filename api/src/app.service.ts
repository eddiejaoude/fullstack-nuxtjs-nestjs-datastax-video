import { Injectable } from '@nestjs/common';
import { createClient } from '@astrajs/collections';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello EddieHub!';
  }

  async getClient() {
    const astraClient = await createClient({
      astraDatabaseId: process.env.ASTRA_DATABASE_ID,
      astraDatabaseRegion: process.env.ASTRA_DATABASE_REGION,
      applicationToken: process.env.ASTRA_APPLICATION_TOKEN,
    });

    return astraClient.namespace('NextJS').collection('members');
  }

  async getMembers() {
    const collection = await this.getClient();
    const members = await collection.find({});

    return Object.keys(members).map((key) => {
      return {
        id: key,
        ...members[key],
      };
    });
  }

  async postMember(member: any) {
    const collection = await this.getClient();
    const result = await collection.create({
      name: member.name,
      location: member.location,
      github: member.github,
    });

    return {
      id: result.documentId,
      ...member,
    };
  }
}
