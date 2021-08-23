export class CronModelDto{
    public Minutes!: string;
    public Hours = ' *';
    public DayOfMonth = ' *';
    public Month = ' *';
    public DayOfWeek = ' *';
}