import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  skills: string[];
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
  members: TeamMember[] = [
    {
      id: 'alejandro-ruiz',
      name: 'Alejandro Ruiz',
      role: 'CTO',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvbD0p5OZOU6ii1e8TB6wqEIDFT2ZJuhqFtcM7rhHiPZZqK1uk0vgbL72mHSkOoSktAJnigFGC82aPMa6EGFhtlQJdnzSVTK9RW6g9CqNjVM22xrKzoUSZ99vjQm7AjH39PyalwLvo0z7vn8Wwn3jR_z31Dh_80nvlKJxeCmQhHNkgMWMk0daC1hbQvf-LWbhAIlTEB-RAS00NksmxsdFJ8zrn1AsjXxJsIU3bUrFPhqdonLnX3MNshOYedShjGKCUfiI6xc1NvMt4',
      skills: ['.NET', 'Azure'],
    },
    {
      id: 'elena-morales',
      name: 'Elena Morales',
      role: 'LEAD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeowi0H68gHRzPv_CHGGign_DSqTdsC8Bg0aQy217v9TAFlP29ul_nM6u__x__bx4OQsByAK2ry_P42E_NZh_1kaiPoQA41kyfnOmYHx69h5qiZ6w0kCkwT5PySULtx_gZbXg1fBTyddB91pKNotK6WaDWqEkJxu3zEXa8oCs1CRRg7Qh00jVvAh4aYF8m_qrYhjGEugHdZ-72s7l3OlyQLN-hvmuzqRyiTVk7-bSbs0bbSKhimNh8SVXXJ-FcvyLgcI3Jwm3_NoW7',
      skills: ['React', 'Angular'],
    },
    {
      id: 'marcos-vega',
      name: 'Marcos Vega',
      role: 'SENIOR',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcEvKHSjmW1HyhfCI036bzPm9uMNixctaxeY0et0qWkj0IS0HEkNPL7VO2qH382vRKh9ghQHHc23zfatiZPfs9yj-sJ-HzETx604w_8ivqyL5uod52GkTIp6Z1OpzdIxNWiNFNfKsmfh-fd0tLBGvACQZzJBC8GMttlG7f0mLsnAhF5orlIFHR8MAKepYdJqe-T_s1f48M7XOjNCGWCXsTufdmhIi9-kYfEL3N7qqwRQI0y3rLHQMHznd4twcVr6xj9m8VMr_1THp_',
      skills: ['Node.js', 'AWS'],
    },
    {
      id: 'sofia-castro',
      name: 'Sofia Castro',
      role: 'MOBILE',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiEgnaO8KMsXRxhw0shbhBhxKcnUsG-2DNvW0OY5W0X-dp9Bbn5o6ugDfZRd9fbhDGIMf9kC7kYaM6FmBnxYR_Qgi-FkKXKhYBaGfKw1l5NPCK2z6vHC25ZXDfajjt-4p6BEE3xf7gZ8NH9Qz37gTJlAdSxx_Yzu7n46QI1Fx7q5ORlPVf84OUMCO8n6jfmmUGOfC2YG_6SvH1o3gC4nJ_bWpfJTNyJBYXkeS7OmEtt2VDz9q-wBckbgt2e6VP0oLPOPKaKBY33a2P',
      skills: ['Swift', 'Flutter'],
    },
  ];
}
