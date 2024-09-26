import countries from './mockCountries';

const orders = countries
  .filter(country => country.occupyingArmy)
  .map(country => ({
    ArmyId: country.occupyingArmy.Id,
    OwnerId: country.occupyingArmy.OwnerId,
    Contest: true,
    Support: false,
    AssistFaction: null,
    Target: country.id,
    Origin: country.id
  }));

export default orders;